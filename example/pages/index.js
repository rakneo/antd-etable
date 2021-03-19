import React, { useState,useRef } from "react";
import EditableTable from '../../dist';
import { Button, Checkbox, Input, Tooltip, Form, Row,Col,InputNumber,DatePicker } from 'antd';
import styles from './index.css';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import _ from "lodash";

const demoData = [
  {id:1,name:'Test 1',title:'Haha',status:0,desc:'Description 1',type:0,created_time:'2019-5-2'},
  {id:2,name:'Test 2',title:'Haha',status:1,desc:'Description 2',type:1,created_time:'2019-5-3'},
  {id:3,name:'Test 3',title:'Haha',status:2,desc:'Description 3',type:0,created_time:'2019-5-4'},
  {id:4,created_time:null},
  {id:5},
];
const type = ['Type 1','Type 2'];
const status = ['Normal','Abnormal','Stop'];
const cols = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
    width: 120,
  },
  {
    title: 'Time Limit',
    dataIndex: 'timeLimit',
    editable: true,
    editor: { type: 'time' },
    width: 120,
    render: (text) => (text ? moment(text,'HH:mm').format('HH:mm') : '')
  },
  {
    title: 'Sub-Attribute',
    dataIndex: ['obj1','a'],
    editable:true,
    width: 120,
    editor: {
      type:'number',
      max: 400,
    }
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    editable:true,
    width: 160,
    editor: {
      required: true,
      validator: (rule,value,callback,record) => {
        if(demoData.find(d => d.name === value && record.id !== d.id))
          callback('The name already exists!');
        else
          callback();
      },
    },
  },
  {
    title: 'Multiple Columns Test',
    children: [
      {title:'Test Column 1',children:[
          {
            title: 'Test 1',
            dataIndex: 'test1',
            width: 120,
            editable:true,
          },
          {
            title: 'Test 2',
            dataIndex: 'test2',
            width: 120,
            editable:true,
          },
        ]},
      {title:'Test Column 2',children:[
          {
            title: 'Test 3',
            dataIndex: 'test3',
            width: 120,
            editable:true,
          },
          {
            title: 'Test 4',
            dataIndex: 'test4',
            width: 120,
            editable:true,
          },
        ]}
    ],
  },
  {
    title: 'Description',
    dataIndex: 'desc',
    editable:true,
    width: 200,
    editor: {
      max: 4,
    },
    render: (text) => {
      return <Tooltip title={text}>{text}</Tooltip>
    }
  },
  {
    title: 'Type',
    dataIndex: 'type',
    sorter: true,
    editable:true,
    width: 120,
    editor: {
      type: 'select',
      options: type.map((value,key) => ({key,value}))
    },
    render: (text, record) => (
      type[text]
    ),
  },
  {
    title: 'Date',
    dataIndex: 'created_time',
    editable:true,
    width: 180,
    editor: {
      type: 'datetime'
    }
  },
];

const allCols = [
  ...cols.slice(0,2),
  {
    title: 'Title',
    dataIndex: 'title',
    editable:true,
    width: 120,
  },
  ...cols.slice(2),
  {
    title: 'Status',
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
let i = 10;
export default function() {
  const [data,setData] = useState(demoData);
  const [changedData,setChangedData] = useState([]);
  const [showToolbar,setShowToolbar] = useState(true);
  const [showOpBtn,setShowOpBtn] = useState(true);
  const [showAddBtn,setShowAddBtn] = useState(true);
  const [showSelector,setShowSelector] = useState(false);
  const [multiSelect,setMultiSelect] = useState(false);
  const [showTopPager,setShowTopPager] = useState(true);
  const [currentPage,setCurrentPage] = useState(1);
  const [showBottomPager,setShowBottomPager] = useState(false);
  const [showHeader,setShowHeader] = useState(true);
  const [showFooter,setShowFooter] = useState(true);
  const [loading,setLoading] = useState(true);
  const [form] = Form.useForm();
  const [currentRow,setCurrentRow] = useState();

  const tableRef = useRef();
  const demoButtons = <>
    <Button size="small" style={{marginRight:8}}>Type 1</Button>
    <Button size="small">Type 2</Button>
  </>;
  const [buttons,setButtons] = useState(demoButtons);
  setTimeout(()=> { setLoading(false); }, 500 );
  const fetch = (pager,filter,sorter) => {
    console.log('onFetch',pager,filter,sorter);
    setLoading(true);
    setTimeout(()=> {
      setLoading(false);
    }, 500 );
  };
  const handleChangeData = (record)=>{
    setChangedData(changedData.map(c => {
      if(c.id === record['id']){
        return {
          ...c,
          name: 'haha'
        }
      }else{
        return c;
      }
    }));
  };
  const handleFormChange = (values)=>{
    if(currentRow){
      const isExistRow = changedData.find(c => c.id === currentRow.id);
      if(!isExistRow){
        const updateData = [...changedData,{id:currentRow.id,...values,isUpdate: true}];
        setChangedData(updateData);
      }else {
        const updateData = changedData.map(c => {
          if (c.id === currentRow.id) {
            return _.merge({}, c, values);
          } else {
            return c;
          }
        });
        setChangedData(updateData);
      }
    }
  };
  const handleExpandRow = (row)=>{
    setData(data.map(c => {
      if(c.id === row.id){
        return _.merge({b:"haha"}, c);
      }else{
        return c;
      }
    }));
  };
  return (
    <div className={styles.root} >
      <div style={{textAlign:'right',marginBottom:16}}>
        <Checkbox onChange={(e)=>setMultiSelect(e.target.checked)} checked={multiSelect}>Multiple choice</Checkbox>
        <Checkbox onChange={(e)=>setShowToolbar(e.target.checked)} checked={showToolbar}>Show toolbar buttons</Checkbox>
        <Checkbox onChange={(e)=>setShowAddBtn(e.target.checked)} checked={showAddBtn}>Show add button</Checkbox>
        <Checkbox onChange={(e)=>setShowTopPager(e.target.checked)} checked={showTopPager}>Show top section pager</Checkbox>
        <Checkbox onChange={(e)=>setShowBottomPager(e.target.checked)} checked={showBottomPager}>Show bottom pager</Checkbox>
        <Checkbox onChange={(e)=>e.target.checked ? setButtons(demoButtons):setButtons(null)} checked={!!buttons}>Show bottom custom button</Checkbox>
        <Checkbox onChange={(e)=>setShowHeader(e.target.checked)} checked={showHeader}>Show top bar</Checkbox>
        <Checkbox onChange={(e)=>setShowFooter(e.target.checked)} checked={showFooter}>Show bottom bar</Checkbox>
        <Button type="primary" onClick={()=>{console.log('onSave',changedData);}}>save</Button>
      </div>
      <Form form={form} onValuesChange={handleFormChange} initialValues={{appId:'WO',appName:'World One'}}>
        <Form.Item name="appId" label="Main Application ID" rules={[{required:true}]} ><Input style={{width:160}} /></Form.Item>
        <Form.Item name="appName" label="Main Application Name" rules={[{required:true},{type:'string',max:5,message:'haha'}]} ><Input style={{width:160}} /></Form.Item>
        <EditableTable
          lang='en'
          ref={tableRef}
          parentForm={form}
          editOnSelected={true}
          bordered={true}
          rowKey="id"
          title="Test Table"
          scroll={{x:1400}}
          loading={loading}
          data={data}
          changedData={changedData}
          currentPage={currentPage}
          pageSize={10}
          total={100}
          cols={cols}
          allCols={allCols}
          buttons={buttons}
          showOpBtn={showOpBtn}
          showAddBtn={showAddBtn}
          multiSelect={multiSelect}
          showSelector={showSelector}
          showTopPager={showTopPager}
          showToolbar={showToolbar}
          showBottomPager={showBottomPager}
          showHeader={showHeader}
          showFooter={showFooter}
          onFetch={(pager,filter,sorter)=>fetch(pager,filter,sorter)}
          onChangedDataUpdate={(d)=>{console.log(d);setChangedData(d)}}
          onAdd={()=>{console.log('onAdd');return {id:'test'+(i++)}}}
          onSelectRow={(rows)=>{console.log('onSelectRow',rows);setCurrentRow(rows[0])}}
          expandedFirstRow={false}
          onExpandedRow={handleExpandRow}
          expandedRowRender={ record => (
            <>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="name" label="Name" rules={[{required:true}]} ><Input suffix={<SearchOutlined onClick={()=>handleChangeData(record)} />} /></Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="created_time"
                             label="Created Time"
                             getValueProps={(value)=>({value:moment(value)})}
                             getValueFromEvent={(e)=> moment(e).format("YYYY-MM-DD HH:mm:ss")}>
                    <DatePicker format="YYYY-MM-DD HH:mm:ss" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={['obj1','b']} label="Sub-attribute 2"><Input /></Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="desc" label="Description"><Input.TextArea /></Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="title" label="Title"><Input /></Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="status" label="Status"><InputNumber /></Form.Item>
                </Col>
              </Row>
            </>
          )}
        />
      </Form>
    </div>
  );
}
