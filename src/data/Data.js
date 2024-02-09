import React from 'react';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock,AiOutlineBlock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);
export const blocksGrid = [
  {
    field: 'BlockNumber',
    headerText: 'Block Number',
    width: '150',
    textAlign: 'Center',
    template: (props) => (
      <button
        type="button"
        className="block-number-link"
        onClick={() => props.onBlockClick(props.BlockNumber)}
      >
        {props.BlockNumber}
      </button>
    ),
  },
    { field: 'QuarryNumber',
      headerText: 'Quarry Number',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'Length',
      headerText: 'Length',
      format: 'C2',
      textAlign: 'Center',
      editType: 'numericedit',
      width: '150',
    },
    
    {
        field: 'Width',
        headerText: 'Width',

        textAlign: 'Center',
        editType: 'numericedit',
        width: '150',
      },
      {
        field: 'Height',
        headerText: 'Height',
        format: 'C2',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '150',
      },
      {
        field: 'MeasurementCBM',
        headerText: 'Measurement (cbm)',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '100',
        template: (props) => (
          <span>{props.Length * props.Width * props.Height}</span>
        ),
      },
    {
      headerText: 'Status',
      template: gridOrderStatus,
      editType: 'dropdownedit',
      field: 'Status',
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'Date',
      headerText: 'Date',
      format: 'C2',
      textAlign: 'Center',
      editType: 'numericedit',
    
    },
    
    
  ];

    export const slabsGrid = [
     
      {
        field: 'SlabNumber',
        headerText: 'Slab Number',
        width: '150',
        textAlign: 'Center',
      },
      
      { field: 'Length', headerText: 'Length', format: 'C2', textAlign: 'Center', editType: 'numericedit', width: '150' },
      { field: 'Breadth', headerText: 'Breadth', textAlign: 'Center', editType: 'numericedit', width: '150' },
      {
        field: 'MeasurementSQFT',
        headerText: 'Measurement (sqft)',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '150',
        template: (props) => (
          <span>{props.Length * props.Breadth}</span>
        ),
      },
      {
        headerText: 'Type',
        template: gridOrderStatus,
        editType: 'dropdownedit',
        field: 'Type',
        textAlign: 'Center',
        width: '120',
      },
      {
        headerText: 'Status',
        template: gridOrderStatus,
        editType: 'dropdownedit',
        field: 'Status',
        textAlign: 'Center',
        width: '120',
      },
      { field: 'Date', headerText: 'Date', width: '150', textAlign: 'Center' },
    ];
    export const slabData=
    [
       {
         Date:'01-06-2023',
           SlabNumber: 1,
           BlockNumber: 1,
           Length: 1,
           Breadth: 2,
           Type:'Fresh',
           Status:'Pending',
           StatusBg: '#FB9678',
           
         }
         
    ]

 export const blocksData=
 [
    {
      Date:"01-06-2023",
        BlockNumber:1,
        QuarryNumber:1,
        Length:1,
        Width:1,
        Height:1,
        Status:"Cutting"
      },
     
 ]
 export const contextMenuItems = [
    'AutoFit',
    'AutoFitAll',
    'SortAscending',
    'SortDescending',
    'Copy',
    'Edit',
    'Delete',
    'Save',
    'Cancel',
    'PdfExport',
    'ExcelExport',
    'CsvExport',
    'FirstPage',
    'PrevPage',
    'LastPage',
    'NextPage',
  ];
  export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'ecommerce',
          icon: <FiShoppingBag />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'Blocks',
          icon: <AiOutlineBlock />,
        },
        {
          name: 'employees',
          icon: <IoMdContacts />,
        },
        {
          name: 'customers',
          icon: <RiContactsLine />,
        },
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'calendar',
          icon: <AiOutlineCalendar />,
        },
        {
          name: 'kanban',
          icon: <BsKanban />,
        },
        {
          name: 'editor',
          icon: <FiEdit />,
        },
        {
          name: 'color-picker',
          icon: <BiColorFill />,
        },
      ],
    },
    {
      title: 'Charts',
      links: [
        {
          name: 'line',
          icon: <AiOutlineStock />,
        },
        {
          name: 'area',
          icon: <AiOutlineAreaChart />,
        },
  
        {
          name: 'bar',
          icon: <AiOutlineBarChart />,
        },
        {
          name: 'pie',
          icon: <FiPieChart />,
        },
        {
          name: 'financial',
          icon: <RiStockLine />,
        },
        {
          name: 'color-mapping',
          icon: <BsBarChart />,
        },
        {
          name: 'pyramid',
          icon: <GiLouvrePyramid />,
        },
        {
          name: 'stacked',
          icon: <AiOutlineBarChart />,
        },
      ],
    },
  ];
  