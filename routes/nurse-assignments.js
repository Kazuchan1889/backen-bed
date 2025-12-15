const express = require('express');
const router = express.Router();
const { NurseAssignment, Nurse, Bed } = require('../models');

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const { nurseId, bedId, active } = req.query;
    const where = {};
    
    if (nurseId) where.nurseId = parseInt(nurseId);
    if (bedId) where.bedId = parseInt(bedId);
    if (active === 'true') {
      where.releasedAt = null;
    }

    const assignments = await NurseAssignment.findAll({
      where,
      include: [
        {
          model: Nurse,
          as: 'nurse',
        },
        {
          model: Bed,
          as: 'bed',
        },
      ],
      order: [['assignedAt', 'DESC']],
    });

    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// Create new assignment
router.post('/', async (req, res) => {
  try {
    const { nurseId, bedId, assignedAt, releasedAt, notes } = req.body;

    if (!nurseId || !bedId) {
      return res.status(400).json({ error: 'Nurse ID and Bed ID are required' });
    }

    // Check if nurse exists
    const nurse = await Nurse.findByPk(nurseId);
    if (!nurse) {
      return res.status(404).json({ error: 'Nurse not found' });
    }

    // Check if bed exists
    const bed = await Bed.findByPk(bedId);
    if (!bed) {
      return res.status(404).json({ error: 'Bed not found' });
    }

    const assignment = await NurseAssignment.create({
      nurseId,
      bedId,
      assignedAt: assignedAt ? new Date(assignedAt) : new Date(),
      releasedAt: releasedAt ? new Date(releasedAt) : null,
      notes: notes || null,
    });

    const createdAssignment = await NurseAssignment.findByPk(assignment.id, {
      include: [
        {
          model: Nurse,
          as: 'nurse',
        },
        {
          model: Bed,
          as: 'bed',
        },
      ],
    });

    res.status(201).json(createdAssignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ error: 'Failed to create assignment' });
  }
});

// Update assignment (release)
router.put('/:id/release', async (req, res) => {
  try {
    const { releasedAt } = req.body;

    const assignment = await NurseAssignment.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    await assignment.update({
      releasedAt: releasedAt ? new Date(releasedAt) : new Date(),
    });

    const updatedAssignment = await NurseAssignment.findByPk(req.params.id, {
      include: [
        {
          model: Nurse,
          as: 'nurse',
        },
        {
          model: Bed,
          as: 'bed',
        },
      ],
    });

    res.json(updatedAssignment);
  } catch (error) {
    console.error('Error releasing assignment:', error);
    res.status(500).json({ error: 'Failed to release assignment' });
  }
});

// Delete assignment
router.delete('/:id', async (req, res) => {
  try {
    const assignment = await NurseAssignment.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    await assignment.destroy();
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
});

module.exports = router;

