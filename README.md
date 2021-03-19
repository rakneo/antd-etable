## Ant Design Editable Table

## Usage
```
import React, {useContext, useState} from "react";
import EditableTable from 'antd-etable';
import {Button} from 'antd';
import styles from './index.css';

const data = [
  {id:1,name:'Test 1',title:'Haha',status:0,desc:'Description 1',type:0,created_time:'2019-5-2'},
  {id:2,name:'Test 2',title:'Haha',status:1,desc:'Description 2',type:1,created_time:'2019-5-3'},
  {id:3,name:'Test 3',title:'Haha',status:2,desc:'Description 3',type:0,created_time:'2019-5-4'}
];
const type = ['Type 1','Type 2'];
const status = ['Noraml','Abnormal','stop'];
const cols = [
  {
    title: 'Name',
    dataIndex: 'name',
    editable:true,
    editor: {
      required: true,
    },
  },
  {
    title: 'Type',
    dataIndex: 'type',
    editable:true,
    editor: {
      type: 'select',
      options: [
        {key: 1, value: 'Type 1'},
        {key: 2, value: 'Type 2'},
      ]
    },
    render: (text, record) => (
      type[text]
    ),
  },
  {
    title: 'date',
    dataIndex: 'created_time',
    editable:true,
    editor: {
      type: 'datetime'
    }
  },
];
const allCols = [
  ...cols.slice(0,2),
  {
    title: 'title',
    dataIndex: 'title',
    editable:true,
    width: 120,
  },
  ...cols.slice(2),
  {
    title: 'status',
    dataIndex: 'status',
    editable:true,
    width: 120,
    editor: {
      type: 'select',
      options: status.map((value,key) => ({key,value}))
    },
    render: (text, record) => (
      status[text]
    ),
  }
];
export default function() {
  const [changedData,setChangedData] = useState([]);
  const fetch = (pager,filter,sorter) => {
    // Do Remote Fetch
  };
  return (
    <div className={styles.root}>
      <div style={{textAlign:'right',marginBottom:16}}><Button type="primary">save</Button></div>
      <EditableTable
        title=""
        loading={false}
        data={data}
        changedData={changedData}
        pageSize={10}
        total={100}
        cols={cols}
        allCols={allCols}
        onFetch={()=>fetch()}
        onChangedDataUpdate={(d)=>{setChangedData(d)}}
      />
    </div>
  );
}

```
## API
##### EditableTable
###### Attributes
| Name | Description | Type | Default Value |
|:---|:---|:---:|:---:|
| data | Initialization data | Array | [] |
| [changedData](#changeddata) | Used to save the updated data added, deleted and modified | Array | [] |
| [cols](#cols) | Table Columns | Array | [] |
| allCols | Table columns can be displayed (the format is the same as the cols attribute) | Array | [] |
| [rowKey](#rowkey) | Unique ID | String |'id' |
| newRowKeyPrefix | New data unique identification prefix | String |'new_' |
| title | Title | String or Component |'' |
| loading | Read status | Boolean | false |
| pageSize | Number of records per page | Number | 10 |
| total | Total number of records | Number | 0 |
| multiSelect | Multiple selections | Boolean | false |
| showHeader | Whether to show the top bar | Boolean | true |
| showFooter | Whether to show the bottom bar | Boolean | true |
| showToolbar | Whether to show the top toolbar | Boolean | true |
| showSelector | Whether to show the selection button | Boolean | false |
| showAddBtn | Whether to show the add button | Boolean | true |
| showOpBtn | Whether to show edit and delete buttons | Boolean | true |
| showTopPager | Whether to show the top pager | Boolean | true |
| showBottomPager | Whether to show the bottom pager | Boolean | false |
| buttons | Custom action button group | Component | None |
| style | style | Object | null |
| expandedRowRender | Rendered content when expanding row | ReactNode | null |
| expandedFirstRow | Expand the first row by default | Boolean | false |
| editOnSelected | Edit when a row is clicked | Boolean | false |
| parentForm | incoming form | FormInstance | null |

###### events
| Name | Description | Parameters | Return Value |
|:---|:---|:---:|:---:|
| canEdit | Whether each line is editable | record | Boolean |
| canRemove | Whether each row can be deleted | record | Boolean |
| beforeEdit | Triggered before editing data | None | None |
| afterEdit | Triggered after editing data | None | None |
| [onAdd](#onadd) | Default object for new data | None | Object |
| onFetch | Request data event | pager,filter,sorter | None |
| [onChangedDataUpdate](#onchangeddataupdate) | Triggered when update data changes | arr | None |
| [onSelectRow](#onselectrow) | Number of records per page | rows | None |
| [onDownload](#ondownload) | Number of records per page | filter,sorter | None |
| onExpandedRow | Triggered when a row is expanded | record | None |

###### methods
| Name | Description | Parameters | Return Value |
|:---|:---|:---:|:---:|
| resetTable | Reset table page number | None | None |

## Config
##### changedData
###### Array, used to save the changed data, each piece of data will use isNew, isUpdate, isDelete to identify whether the data is new, updated or deleted

##### cols
###### Parameter example
```
[{
   title: 'ID',
   dataIndex: 'id',
   editable:false,
},{
   title: 'name',
   dataIndex: 'name',
   sorter: true,
   editable:true,
   editor: {
     required: true,
     type: 'select',
     options: [
       {key: 1, value: 'Type 1'},
       {key: 2, value: 'Type 2'},
     ],
     validator: (rule,value,callback) => {
       if(data.find(d => d.name === value))
         callback('Name already exists!');
       else
         callback();
     },
   },
}]
```
###### editable：Set editable status
###### editor：The default type of the object is text and Supported types include select、number、datetime、checkbox，
###### If you need to pass in the options parameter for select

##### rowKey
###### The unique identifier of the data, must be unique, used to judge the editing status and matching data

##### onAdd
###### When you click Add, the method of initializing data can be configured to return a new data object, which can be used to set some default values

##### onChangedDataUpdate
###### This method is triggered every time you add, update, or delete, and pass in the updated array

##### onSelectRow
###### This method will pass in an array of selected objects. If it is a single-selection mode, the array only contains the objects of the currently clicked row

##### onDownload
###### Triggered when you click the toolbar to download. If the method is configured, the method will receive two parameters of filter and sorter. If there is no configuration method, the excel download of the current page will be generated by default.
