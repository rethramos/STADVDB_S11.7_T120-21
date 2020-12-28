import createTable from '../helpers/table-helper';

const districtSelect = document.getElementById('district');
const resetButton = document.getElementById('reset-btn');
const committedCrimesContainer = document.getElementById(
  'committed-crimes-table',
);
const noRecordsFound = document.getElementById('no-records');
const committedCrimesTable = createTable(`#${committedCrimesContainer.id}`, {
  ajaxURL: '/api/committed-crimes',
  pagination: 'local',
  paginationSize: 10
});

fetch('/api/districts')
  .then(response => response.json())
  .then(data => {
    data.forEach(d => {
      let option = document.createElement('option');
      let text = document.createTextNode(d);
      option.value = d;

      option.appendChild(text);
      districtSelect.appendChild(option);
    });
  });

districtSelect.onchange = e => {
  const district = document.getElementById('district').value;
  console.log(district);
  committedCrimesTable
    .setData(committedCrimesTable.getAjaxUrl(), { district })
    .then(() => {
      const force = !committedCrimesTable.getDataCount();

      committedCrimesContainer.classList.toggle('d-none', force);
      noRecordsFound.classList.toggle('d-none', !force);
    });
};

resetButton.onclick = e => {
  committedCrimesTable
    .setData(committedCrimesTable.getAjaxUrl(), { district: '' })
    .then(() => {
      const force = !committedCrimesTable.getDataCount();

      committedCrimesContainer.classList.toggle('d-none', force);
      noRecordsFound.classList.toggle('d-none', !force);
    });
};
