exports.renderFinishedContracts = (req, res) => {
  res.render('accounts-finished-contracts', { title: 'Finished Contracts' });
};

exports.renderAccountDistrict = (req, res) => {
  res.render('accounts-account-district', {
    title: `Find an Account's District`,
  });
};
