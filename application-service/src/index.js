const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// In-memory "applications" (appointments) – sample data
let applications = [
  { id: '1', patientId: '1', type: 'Consultation', status: 'Pending' },
  { id: '2', patientId: '2', type: 'Follow-up', status: 'Approved' }
];

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Application Service' });
});

app.get('/applications', (req, res) => {
  res.json({
    message: 'Applications retrieved successfully',
    count: applications.length,
    applications
  });
});

app.get('/applications/:id', (req, res) => {
  const application = applications.find(a => a.id === req.params.id);
  if (application) {
    res.json({ message: 'Application found', application });
  } else {
    res.status(404).json({ error: 'Application not found' });
  }
});

app.post('/applications', (req, res) => {
  try {
    const { patientId, type, status } = req.body;
    if (!patientId || !type) {
      return res.status(400).json({ error: 'patientId and type are required' });
    }

    const newApplication = {
      id: (applications.length + 1).toString(),
      patientId,
      type,
      status: status || 'Pending'
    };

    applications.push(newApplication);
    res.status(201).json({ message: 'Application created', application: newApplication });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Application service listening at http://0.0.0.0:${port}`);
});
