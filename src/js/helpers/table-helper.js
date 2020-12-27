import 'tabulator-tables/dist/css/tabulator.min.css';
import Tabulator from 'tabulator-tables';

const createTable = (elementID, options) => {
  const obj = { autoColumns: true, layout: 'fitColumns' };

  return new Tabulator(elementID, Object.assign(obj, options));
};

export default createTable;
