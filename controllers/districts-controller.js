exports.renderUnemploymentRate = (req, res) => {
  res.render('districts-unemployment-rate', {
    title: 'Average Unemployment Rate per Region',
  });
};

exports.renderSalary = (req, res) => {
  res.render('districts-salary', { title: 'Salary per Region' });
};