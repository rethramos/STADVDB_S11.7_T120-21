exports.renderContractStatus = (req, res) => {
  res.render('accounts-contract-status', { title: 'Contract Status' });
};

exports.renderAccountDistrict = (req, res) => {
  res.render('accounts-account-district', {
    title: `Find an Account's District`,
  });
};
