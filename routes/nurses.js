const express = require('express');
const router = express.Router();
const { Nurse, NurseAssignment, Bed } = require('../models');

// Get all nurses
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    
    if (status) where.status = status;

    const nurses = await Nurse.findAll({
      where,
      order: [['name', 'ASC']],
    });

    res.json(nurses);
  } catch (error) {
    console.error('Error fetching nurses:', error);
    res.status(500).json({ error: 'Failed to fetch nurses' });
  }
});

// Get nurse by ID with assignments
router.get('/:id', async (req, res) => {
  try {
    const nurse = await Nurse.findByPk(req.params.id, {
      include: [{
        model: NurseAssignment,
        as: 'assignments',
        include: [{
          model: Bed,
          as: 'bed',
        }],
        order: [['assignedAt', 'DESC']],
      }],
    });

    if (!nurse) {
      return res.status(404).json({ error: 'Nurse not found' });
    }

    res.json(nurse);
  } catch (error) {
    console.error('Error fetching nurse:', error);
    res.status(500).json({ error: 'Failed to fetch nurse' });
  }
});

// Create new nurse
router.post('/', async (req, res) => {
  try {
    const { name, employeeId, phone, email, status } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Nurse name is required' });
    }

    const nurse = await Nurse.create({
      name,
      employeeId: employeeId || null,
      phone: phone || null,
      email: email || null,
      status: status || 'active',
    });

    res.status(201).json(nurse);
  } catch (error) {
    console.error('Error creating nurse:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Employee ID already exists' });
    }
    res.status(500).json({ error: 'Failed to create nurse' });
  }
});

// Update nurse
router.put('/:id', async (req, res) => {
  try {
    const { name, employeeId, phone, email, status } = req.body;

    const nurse = await Nurse.findByPk(req.params.id);
    if (!nurse) {
      return res.status(404).json({ error: 'Nurse not found' });
    }

    await nurse.update({
      name: name || nurse.name,
      employeeId: employeeId !== undefined ? employeeId : nurse.employeeId,
      phone: phone !== undefined ? phone : nurse.phone,
      email: email !== undefined ? email : nurse.email,
      status: status || nurse.status,
    });

    res.json(nurse);
  } catch (error) {
    console.error('Error updating nurse:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Employee ID already exists' });
    }
    res.status(500).json({ error: 'Failed to update nurse' });
  }
});

// Delete nurse
router.delete('/:id', async (req, res) => {
  try {
    const nurse = await Nurse.findByPk(req.params.id);
    if (!nurse) {
      return res.status(404).json({ error: 'Nurse not found' });
    }

    await nurse.destroy();
    res.json({ message: 'Nurse deleted successfully' });
  } catch (error) {
    console.error('Error deleting nurse:', error);
    res.status(500).json({ error: 'Failed to delete nurse' });
  }
});

// Get nurse assignments
router.get('/:id/assignments', async (req, res) => {
  try {
    const { active } = req.query;
    const where = { nurseId: req.params.id };
    
    if (active === 'true') {
      where.releasedAt = null;
    }

    const assignments = await NurseAssignment.findAll({
      where,
      include: [{
        model: Bed,
        as: 'bed',
      }],
      order: [['assignedAt', 'DESC']],
    });

    res.json(assignments);
  } catch (error) {
    console.error('Error fetching nurse assignments:', error);
    res.status(500).json({ error: 'Failed to fetch nurse assignments' });
  }
});

module.exports = router;

