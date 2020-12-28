exports.renderUnemploymentRate = (req, res) => {
  res.render('districts-unemployment-rate', {
    title: 'Average Unemployment Rate per Region',
  });
};

exports.renderSalary = (req, res) => {
  res.render('districts-salary', { title: 'Salary per Region' });
};

exports.renderCommittedCrimes = (req, res) => {
  res.render('districts-commited-crimes', {
    title: 'Average Committed Crimes',
  });
};
