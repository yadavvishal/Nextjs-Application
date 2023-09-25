const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// In-memory data structure to store employee data
const employeeData = [
  { id: 1, name: 'John Doe', salary: 50000 },
  { id: 2, name: 'Jane Smith', salary: 60000 },
  { id: 3, name: 'Bob Johnson', salary: 55000 },
];

// Endpoint to get all employees
app.get('/employees', (req, res) => {
  res.json(employeeData);
});

// Endpoint to add a new employee
app.post('/employees', (req, res) => {
  const { name, salary } = req.body;

  if (!name || isNaN(salary)) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const newEmployee = {
    id: employeeData.length + 1,
    name,
    salary: parseFloat(salary),
  };

  employeeData.push(newEmployee);

  return res.status(201).json(newEmployee);
});

// Endpoint to update an employee's salary by ID
app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { salary } = req.body;

  if (isNaN(id) || isNaN(salary)) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const employee = employeeData.find((e) => e.id === id);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  employee.salary = parseFloat(salary);

  return res.status(200).json(employee);
});

// Endpoint to delete an employee by ID
app.delete('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const index = employeeData.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  employeeData.splice(index, 1);

  return res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


