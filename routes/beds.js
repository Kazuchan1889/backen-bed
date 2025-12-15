const express = require('express');
const router = express.Router();
const { Bed, Patient, Nurse, NurseAssignment } = require('../models');

// Get all beds
router.get('/', async (req, res) => {
  try {
    const { floor, room, status } = req.query;
    const where = {};
    
    if (floor) where.floor = parseInt(floor);
    if (room) where.room = room;
    if (status) where.status = status;

    const beds = await Bed.findAll({
      where,
      include: [
        {
          model: Patient,
          as: 'patient',
          required: false,
        },
        {
          model: Nurse,
          as: 'nurse',
          required: false,
        },
      ],
      order: [['id', 'ASC']],
    });

    // Format response sesuai dengan format frontend
    const formattedBeds = beds.map(bed => ({
      id: bed.id,
      status: bed.status,
      room: bed.room,
      floor: bed.floor,
      assignedAt: bed.assignedAt,
      releasedAt: bed.releasedAt,
      repairNote: bed.repairNote,
      repairStartAt: bed.repairStartAt,
      repairEndAt: bed.repairEndAt,
      patient: bed.patient ? {
        id: bed.patient.id.toString(),
        name: bed.patient.name,
        age: bed.patient.age,
        gender: bed.patient.gender,
        medicalRecord: bed.patient.medicalRecord,
      } : undefined,
      nurse: bed.nurse ? {
        id: bed.nurse.id,
        name: bed.nurse.name,
        employeeId: bed.nurse.employeeId,
      } : undefined,
    }));

    res.json(formattedBeds);
  } catch (error) {
    console.error('Error fetching beds:', error);
    res.status(500).json({ error: 'Failed to fetch beds' });
  }
});

// Get bed by ID
router.get('/:id', async (req, res) => {
  try {
    const bed = await Bed.findByPk(req.params.id, {
      include: [
        {
          model: Patient,
          as: 'patient',
          required: false,
        },
        {
          model: Nurse,
          as: 'nurse',
          required: false,
        },
      ],
    });

    if (!bed) {
      return res.status(404).json({ error: 'Bed not found' });
    }

    res.json({
      id: bed.id,
      status: bed.status,
      room: bed.room,
      floor: bed.floor,
      assignedAt: bed.assignedAt,
      releasedAt: bed.releasedAt,
      repairNote: bed.repairNote,
      repairStartAt: bed.repairStartAt,
      repairEndAt: bed.repairEndAt,
      patient: bed.patient ? {
        id: bed.patient.id.toString(),
        name: bed.patient.name,
        age: bed.patient.age,
        gender: bed.patient.gender,
        medicalRecord: bed.patient.medicalRecord,
      } : undefined,
      nurse: bed.nurse ? {
        id: bed.nurse.id,
        name: bed.nurse.name,
        employeeId: bed.nurse.employeeId,
      } : undefined,
    });
  } catch (error) {
    console.error('Error fetching bed:', error);
    res.status(500).json({ error: 'Failed to fetch bed' });
  }
});

// Assign patient to bed
router.post('/:id/assign', async (req, res) => {
  try {
    const { name, age, gender, medicalRecord, assignedAt, releasedAt, nurseId } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Patient name is required' });
    }

    const bed = await Bed.findByPk(req.params.id);
    if (!bed) {
      return res.status(404).json({ error: 'Bed not found' });
    }

    if (bed.status !== 'available') {
      return res.status(400).json({ error: 'Bed is not available' });
    }

    // Validate dates
    const startDate = assignedAt ? new Date(assignedAt) : new Date();
    const endDate = releasedAt ? new Date(releasedAt) : null;

    if (endDate && endDate <= startDate) {
      return res.status(400).json({ error: 'Tanggal selesai harus setelah tanggal mulai' });
    }

    // Validate nurse if provided
    if (nurseId) {
      const nurse = await Nurse.findByPk(nurseId);
      if (!nurse) {
        return res.status(404).json({ error: 'Nurse not found' });
      }
    }

    // Create or find patient
    const [patient] = await Patient.findOrCreate({
      where: { name, medicalRecord: medicalRecord || null },
      defaults: { name, age, gender, medicalRecord },
    });

    // Update bed
    await bed.update({
      status: 'occupied',
      patientId: patient.id,
      assignedAt: startDate,
      releasedAt: endDate,
      nurseId: nurseId || null,
    });

    // Create nurse assignment if nurseId is provided
    if (nurseId) {
      await NurseAssignment.create({
        nurseId,
        bedId: bed.id,
        assignedAt: startDate,
        releasedAt: endDate,
      });
    }

    const updatedBed = await Bed.findByPk(req.params.id, {
      include: [
        {
          model: Patient,
          as: 'patient',
        },
        {
          model: Nurse,
          as: 'nurse',
        },
      ],
    });

    res.json({
      id: updatedBed.id,
      status: updatedBed.status,
      room: updatedBed.room,
      floor: updatedBed.floor,
      assignedAt: updatedBed.assignedAt,
      releasedAt: updatedBed.releasedAt,
      repairNote: updatedBed.repairNote,
      repairStartAt: updatedBed.repairStartAt,
      repairEndAt: updatedBed.repairEndAt,
      patient: {
        id: updatedBed.patient.id.toString(),
        name: updatedBed.patient.name,
        age: updatedBed.patient.age,
        gender: updatedBed.patient.gender,
        medicalRecord: updatedBed.patient.medicalRecord,
      },
      nurse: updatedBed.nurse ? {
        id: updatedBed.nurse.id,
        name: updatedBed.nurse.name,
        employeeId: updatedBed.nurse.employeeId,
      } : undefined,
    });
  } catch (error) {
    console.error('Error assigning bed:', error);
    res.status(500).json({ error: 'Failed to assign bed' });
  }
});

// Release bed
router.post('/:id/release', async (req, res) => {
  try {
    const bed = await Bed.findByPk(req.params.id);
    if (!bed) {
      return res.status(404).json({ error: 'Bed not found' });
    }

    // Release all active nurse assignments for this bed
    await NurseAssignment.update(
      { releasedAt: new Date() },
      { where: { bedId: bed.id, releasedAt: null } }
    );

    await bed.update({
      status: 'available',
      patientId: null,
      assignedAt: null,
      releasedAt: null,
      nurseId: null,
    });

    res.json({
      id: bed.id,
      status: bed.status,
      room: bed.room,
      floor: bed.floor,
      assignedAt: null,
      releasedAt: null,
      repairNote: bed.repairNote,
      repairStartAt: bed.repairStartAt,
      repairEndAt: bed.repairEndAt,
      patient: undefined,
      nurse: undefined,
    });
  } catch (error) {
    console.error('Error releasing bed:', error);
    res.status(500).json({ error: 'Failed to release bed' });
  }
});

// Set bed to repair
router.post('/:id/repair', async (req, res) => {
  try {
    const { repairNote, repairStartAt, repairEndAt } = req.body;
    const bed = await Bed.findByPk(req.params.id);
    
    if (!bed) {
      return res.status(404).json({ error: 'Bed not found' });
    }

    // Validate dates
    const startDate = repairStartAt ? new Date(repairStartAt) : new Date();
    const endDate = repairEndAt ? new Date(repairEndAt) : null;

    if (endDate && endDate <= startDate) {
      return res.status(400).json({ error: 'Tanggal selesai perbaikan harus setelah tanggal mulai' });
    }

    await bed.update({
      status: 'repair',
      repairNote: repairNote || null,
      repairStartAt: startDate,
      repairEndAt: endDate,
      patientId: null,
      assignedAt: null,
      releasedAt: null,
    });

    const updatedBed = await Bed.findByPk(req.params.id);

    res.json({
      id: updatedBed.id,
      status: updatedBed.status,
      room: updatedBed.room,
      floor: updatedBed.floor,
      assignedAt: null,
      releasedAt: null,
      repairNote: updatedBed.repairNote,
      repairStartAt: updatedBed.repairStartAt,
      repairEndAt: updatedBed.repairEndAt,
      patient: undefined,
    });
  } catch (error) {
    console.error('Error setting bed to repair:', error);
    res.status(500).json({ error: 'Failed to set bed to repair' });
  }
});

// Set bed to available
router.post('/:id/available', async (req, res) => {
  try {
    const bed = await Bed.findByPk(req.params.id);
    if (!bed) {
      return res.status(404).json({ error: 'Bed not found' });
    }

    await bed.update({
      status: 'available',
      repairNote: null,
      repairStartAt: null,
      repairEndAt: null,
      patientId: null,
      assignedAt: null,
      releasedAt: null,
    });

    res.json({
      id: bed.id,
      status: bed.status,
      room: bed.room,
      floor: bed.floor,
      assignedAt: null,
      releasedAt: null,
      repairNote: null,
      repairStartAt: null,
      repairEndAt: null,
      patient: undefined,
    });
  } catch (error) {
    console.error('Error setting bed to available:', error);
    res.status(500).json({ error: 'Failed to set bed to available' });
  }
});

// Get bed statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const { floor } = req.query;
    const where = floor ? { floor: parseInt(floor) } : {};

    const allBeds = await Bed.findAll({ where });
    
    const stats = {
      total: allBeds.length,
      available: allBeds.filter(b => b.status === 'available').length,
      occupied: allBeds.filter(b => b.status === 'occupied').length,
      repair: allBeds.filter(b => b.status === 'repair').length,
      maintenance: allBeds.filter(b => b.status === 'maintenance').length,
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;

