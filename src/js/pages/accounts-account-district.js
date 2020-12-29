import createTable from '../helpers/table-helper';

const accountDistrictContainer = document.getElementById(
  'account-district-table',
);
const noRecordsFound = document.getElementById('no-records');

const accountDistrictTable = createTable(
  `#${accountDistrictContainer.id}`,
  {
    ajaxURL: '/api/account-district',
    pagination: 'local',
    paginationSize: 10,
  },
);

document.getElementById('form-fnd-account-district').onsubmit = e => {
  e.preventDefault();

  let account_id = document.getElementById('account_id').value;

  accountDistrictTable
    .setData(accountDistrictTable.getAjaxUrl(), {
      account_id,
    })
    .then(() => {
      let force = !accountDistrictTable.getDataCount();

      accountDistrictContainer.classList.toggle('d-none', force);
      noRecordsFound.classList.toggle('d-none', !force);
    });
};
