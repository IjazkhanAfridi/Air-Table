import React, { useState } from 'react';
import { TableData } from './tableData';
import { ExportToCsv } from 'export-to-csv';
import Select from 'react-select';

const optionList = [
  { value: 'record_id', label: 'Record Id' },
  { value: 'status', label: 'Status' },
  { value: 'quickbasestatus', label: 'Quickbase Status' },
  { value: 'qb_mcnNumber', label: 'MCN on Project' },
  { value: 'customerName', label: 'customer Name' },
  { value: 'emial', label: 'email' },
  { value: 'quickbasestatus', label: 'Quickbase Status' },
];

const Table = () => {
  const [filteredData, setFilteredData] = useState(TableData);
  const [statusSorting, setStatusSorting] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(optionList);
  const [hideDropdown, sethideDropdown] = useState(false);
  const [groupDropdown, setGroupDropdown] = useState(false);
  const [grouping, setGrouping] = useState();
  const [groupDatashow, setGroupDatashow] = useState(false);

  // const [tableData, setTableData] = useState(TableData);
  console.log('table data :', filteredData);

  const handleSortById = () => {
    const data = [...filteredData].sort(function (a, b) {
      return a - b;
    });
    setFilteredData(data.reverse());
  };

  const handleSortByStatus = () => {
    const data = [...filteredData].sort((a, b) => {
      if (statusSorting == true) {
        return a.status.localeCompare(b.status);
      } else {
        return b.status.localeCompare(a.status);
      }
    });
    setFilteredData(data);
    setStatusSorting(!statusSorting);
  };

  const handleSortByQuickBaseStatus = () => {
    const data = [...filteredData].sort((a, b) => {
      if (statusSorting == true) {
        return a.sourceStatus.localeCompare(b.sourceStatus);
      } else {
        return b.sourceStatus.localeCompare(a.sourceStatus);
      }
    });
    setFilteredData(data);
    setStatusSorting(!statusSorting);
  };

  const handleSearch = (e) => {
    let val = e.target.value;
    const temp = [...TableData];
    setFilteredData(
      temp.filter((item) => {
        if (item.status.includes(val)) {
          return item.status.includes(val);
        }
      })
    );
  };

  const handlePrint = (e) => {
    var content = document.getElementById('completeTable');
    var pri = document.getElementById('ifmcontentstoprint').contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  const handelExportCSV = () => {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(filteredData);
  };
  const handlehide = () => {
    if (hideDropdown == false) {
      sethideDropdown(true);
    } else {
      sethideDropdown(false);
    }
  };
  const handleGroup = () => {
    if (groupDropdown == false) {
      setGroupDropdown(true);
    } else {
      setGroupDropdown(false);
    }
  };
  function handleSelect(data) {
    setSelectedOptions(data);
  }

  const val = selectedOptions.map((it) => it.value);

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
    setGroupDatashow(true);
  };

  const groupedData = groupData(TableData, grouping); // assumes you have a function called groupData that returns the grouped data

  function groupData(data, grouping) {
    if (!grouping) {
      return data;
    }

    const groups = {};

    data.forEach((item) => {
      const groupValue = item[grouping];
      if (!groups[groupValue]) {
        groups[groupValue] = [];
      }
      groups[groupValue].push(item);
    });

    return groups;
  }

  return (
    <div className='w-full'>

      <iframe
        id='ifmcontentstoprint'
        style={{ height: '0px', width: '0px', position: 'absolute' }}
      ></iframe>
      <div className=''>
        <div className='flex items-center justify-between pb-4 bg-white dark:bg-gray-900'>
          <div className='px-5 py-3'>
            <button
              id='dropdownActionButton'
              data-dropdown-toggle='dropdownAction'
              className='inline-flex mx-3 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
              type='button'
              onClick={handlehide}
            >
              Hide Fields
            </button>
            <button
              id='dropdownActionButton'
              data-dropdown-toggle='dropdownAction'
              className='inline-flex mx-3 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
              type='button'
              onClick={handleGroup}
            >
              Group
            </button>
            <button
              onClick={handlePrint}
              target='_blank'
              id='dropdownActionButton'
              data-dropdown-toggle='dropdownAction'
              className='inline-flex mx-3 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
              type='button'
            >
              Print
            </button>
            <button
              onClick={handelExportCSV}
              target='_blank'
              id='dropdownActionButton'
              data-dropdown-toggle='dropdownAction'
              className='inline-flex mx-3 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
              type='button'
            >
              Export CSV
            </button>
          </div>
          <label htmlFor='table-search' className='sr-only '>
            Search
          </label>
          <div className='relative mx-3'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              id='table-search-users'
              // value={name}
              className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search...'
              onChange={handleSearch}
            />
          </div>
        </div>
        <div
          className={
            hideDropdown ? 'w-100 dark:bg-gray-900 flex flex-wrap' : 'hidden'
          }
        >
          <Select
            options={optionList}
            placeholder='Select options'
            value={selectedOptions}
            onChange={handleSelect}
            isSearchable={true}
            isMulti
            className='w-full bg-black text-black-500'
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.className ? 'bg-black' : 'black',
                border: state.className ? '' : '1px solid gray',
              }),
            }}
          />
        </div>
        <div
          className={
            groupDropdown ? 'w-100 dark:bg-gray-900 flex flex-wrap' : 'hidden'
          }
        >
          <label>
            Group by:
            <select value={grouping} onChange={handleGroupingChange}>
              <option value=''>None</option>
              <option value='id'>id</option>
              <option value='qb_mcnNumber'>MCN Number</option>
              <option value='status'>Status</option>
              <option value='customerName'>customer Name</option>
              <option value='sourceStatus'>source Status</option>
              <option value='updatedAt'>updated At</option>
            </select>
          </label>
        </div>
      </div>
      <div className='relative overflow-x-auto' id='completeTable'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th
                scope='col'
                className={
                  val.includes('record_id') ? 'px-6 py-3' : 'hidden mt-6'
                }
              >
                <button onClick={handleSortById}>Record ID</button>
              </th>
              <th
                scope='col'
                className={val.includes('status') ? 'px-6 py-3' : 'hidden mt-6'}
              >
                <button onClick={handleSortByStatus}>Status</button>
              </th>
              <th
                scope='col'
                className={
                  val.includes('quickbasestatus') ? 'px-6 py-3' : 'hidden mt-6'
                }
              >
                <button onClick={handleSortByQuickBaseStatus}>
                  QuickBase Status
                </button>
              </th>
              <th
                scope='col'
                className={
                  val.includes('qb_mcnNumber') ? 'px-6 py-3' : 'hidden mt-6'
                }
              >
                MCN on Project
              </th>
              <th
                scope='col'
                className={
                  val.includes('customerName') ? 'px-6 py-3' : 'hidden mt-6'
                }
              >
                Customer Name
              </th>
            </tr>
          </thead>
          <tbody>
            {groupDatashow == false
              ? filteredData.map((items, i) => {
                  return (
                    <>
                      <tr
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                        key={i}
                      >
                        <th
                          scope='row'
                          className={
                            val.includes('record_id')
                              ? 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                              : 'hidden mt-6'
                          }
                        >
                          {items.id}
                          <span className='ms-6'>{items.qb_id}</span>
                        </th>
                        <td
                          className={
                            val.includes('status') ? 'px-6 py-4' : 'hidden mt-6'
                          }
                        >
                          <span
                            className={
                              items.status == 'COMPLETED'
                                ? 'bg-green-600 rounded rounded-[15px] px-2 py-1'
                                : items.status == 'WARNING'
                                ? 'bg-orange-600 rounded rounded-[15px] px-2 py-1'
                                : items.status == 'IN PROGRESS'
                                ? 'bg-blue-300 rounded rounded-[15px] px-2 py-1'
                                : items.status == 'OVERDUE'
                                ? 'bg-red-300 rounded rounded-[15px] px-2 py-1'
                                : ''
                            }
                          >
                            {items.status}
                          </span>
                        </td>
                        <td
                          className={
                            val.includes('quickbasestatus')
                              ? 'px-6 py-4'
                              : 'hidden mt-6'
                          }
                        >
                          {items.sourceStatus}
                        </td>
                        <td
                          className={
                            val.includes('qb_mcnNumber')
                              ? 'px-6 py-4'
                              : 'hidden mt-6'
                          }
                        >
                          {items.qb_mcnNumber}
                        </td>
                        <td
                          className={
                            val.includes('customerName')
                              ? 'px-6 py-4'
                              : 'hidden mt-6'
                          }
                        >
                          {items.customerName}
                        </td>
                      </tr>
                    </>
                  );
                })
              : grouping &&
                Object.entries(groupedData).map(([groupName, groupItems]) => (
                  <>
                    <tr
                      key={groupName}
                      className='bg-white border border-gray dark:bg-gray-800 dark:border-gray-700 w-[30%]'
                    >
                      <th
                        scope='row'
                        className={
                          'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        }
                      >
                        Data Grouped By : {grouping}
                      </th>
                    </tr>
                    {groupItems.map((item) => (
                      <>
                        {/* <tr
                    key={item.id}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-[30%]'
                  >
                    <th
                      scope='row'
                      className={
                        'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                      }
                    >
                      {grouping}
                    </th>
                  </tr> */}
                        <tr
                          key={item.id}
                          className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                        >
                          <th
                            scope='row'
                            className={
                              'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                            }
                          >
                            {item.id}
                            <span className='ms-6'>{item.qb_id}</span>
                          </th>
                          <td className={'px-6 py-4'}>
                            <span className={''}> {item.status}</span>
                          </td>
                          <td className={'px-6 py-4'}>{item.sourceStatus}</td>
                          <td className={'px-6 py-4'}> {item.qb_mcnNumber}</td>
                          <td className={'px-6 py-4'}>{item.customerName}</td>
                        </tr>
                      </>
                    ))}
                  </>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

const SortArrow = () => {
  return (
    <>
      <span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-3 h-3 ml-1'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 320 512'
        >
          <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
        </svg>
      </span>
    </>
  );
};
