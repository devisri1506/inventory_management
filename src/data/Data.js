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
    field: 'blockId',
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
    { field: 'quarryId',
      headerText: 'Quarry Number',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'length',
      headerText: 'Length',
      format: 'C2',
      textAlign: 'Center',
      editType: 'numericedit',
      width: '150',
    },
    
    {
        field: 'width',
        headerText: 'Width',

        textAlign: 'Center',
        editType: 'numericedit',
        width: '150',
      },
      {
        field: 'height',
        headerText: 'Height',
        format: 'C2',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '150',
      },
      {
        field: 'blockMeasurement',
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
      field: 'blockStatus',
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'entryDate',
      headerText: 'Date',
      format: 'C2',
      textAlign: 'Center',
      editType: 'numericedit',
    
    },
    
    
  ];
  export const ordersGrid = [
    {
      field: 'orderId',
      headerText: 'Order ID',
      width: '150',
      textAlign: 'Center',
    },
    
      { field: 'customerName',
        headerText: 'Customer Name',
        width: '150',
        textAlign: 'Center',
      },
      {
        field: 'customerPhoneNumber',
        headerText: 'Customer Phone Number',
        format: 'C2',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '150',
      },
      
      {
          field: 'fresh',
          headerText: 'Fresh',
  
          textAlign: 'Center',
          editType: 'numericedit',
          width: '150',
        },
        {
          field: 'lightDefect',
          headerText: 'Light Defect',
          format: 'C2',
          textAlign: 'Center',
          editType: 'numericedit',
          width: '150',
        },
        {
          field: 'defect',
          headerText: 'Defect',
          textAlign: 'Center',
          editType: 'numericedit',
          width: '100',
          
        },
     
      {
        field: 'entryDate',
        headerText: 'Date',
        format: 'C2',
        textAlign: 'Center',
        editType: 'numericedit',
      
      },

       {
      headerText: 'Status',
      template: gridOrderStatus,
      editType: 'dropdownedit',
      field: 'status',
      textAlign: 'Center',
      width: '120',
    },
      
    ];
    export const ordersData=
 [
    {
      entryDate:"01-06-2023",
      orderId:1,
      customerName:1,
      customerPhoneNumber:1,
        fresh:1,
        lightDefect:1,
        defect:1,
        status:"Pending",
      },
     
 ]
 
    export const slabsGrid = [
     
      {
        field: 'slabId',
        headerText: 'Slab Number',
        width: '150',
        textAlign: 'Center',
      },
      
      { field: 'length', headerText: 'Length', format: 'C2', textAlign: 'Center', editType: 'numericedit', width: '150' },
      { field: 'breadth', headerText: 'Breadth', textAlign: 'Center', editType: 'numericedit', width: '150' },
      {
        field: 'slabMeasurement',
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
        field: 'slabType',
        textAlign: 'Center',
        width: '120',
      },
      {
        headerText: 'Status',
        template: gridOrderStatus,
        editType: 'dropdownedit',
        field: 'slabStatus',
        textAlign: 'Center',
        width: '120',
      },
      { field: 'producedOn', headerText: 'Date', width: '150', textAlign: 'Center' },
    ];
    export const slabData=
    [
       {
         producedOn:'01-06-2023',
           slabId: 1,
           blockId: 1,
           length: 1,
           breadth: 2,
           slabType:'Fresh',
           slabStatus:'Pending',
           StatusBg: '#FB9678',
           
         }
         
    ]

    export const blocksData=
    [
       {
           entryDate:"01-06-2023",
           blockId:1,
           quarryId:1,
           length:1,
           width:1,
           height:1,
           blockStatus:"Cutting"
       },
        
    ]
 export const customersGrid = [
  {
    field: 'customerId',
    headerText: 'Customer ID',
    width: '150',
    textAlign: 'Center',
  },
    { field: 'customerName',
      headerText: 'Customer Name',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'organizationName',
      headerText: 'Organization Name',
      textAlign: 'Center',
      width: '100'
    },
    {
      field: 'billingAddress',
      headerText: 'Billing Address',
      textAlign: 'Center',
      width: '150',
    },
    
    {
        field: 'shippingAddress',
        headerText: 'Shipping Address',
        textAlign: 'Center',
        width: '150',
      },
      {
        field: 'customerPhone',
        headerText: 'Phone Number',
        textAlign: 'Center',
        width: '150',
      },
      {
        field: 'customerEmailId',
        headerText: 'Email ID',
        textAlign: 'Center',
        width: '100'
      },    
  ];
  export const customersData=
  [
    {
      customerId: 1,
      customerName: "Balaji",
      organizationName: "JBI",
      billingAddress: "a, b, banglore",
      shippingAddress: "a, b, banglore",
      customerPhone: 919959961204,
      customerEmailId: "balaji123@jbi.com"
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
          name: 'Orders',
          icon: <AiOutlineShoppingCart />,
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
          name: 'kanban',
          icon: <BsKanban />,
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
  