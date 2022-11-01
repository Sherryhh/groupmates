import React , {useState , useEffect } from 'react'
import Layout, { Header, Content, Footer } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import { Table, Row, Col } from 'antd';
import axios from 'axios'

const columns =[
    {
        title: t`Team Name`,
        dataIndex: 'name',
      },
      {
        title: t`Group Leader`,
        dataIndex: 'leader',
      },
      {
        title: t`Languages`,
        dataIndex: 'language',
      },
      {
        title: t`Looking for...`,
        dataIndex: 'skill',
      },
]


const ListGroup = () =>{
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        getData() }
    , [])

    const getData = async () => {
        const url = '/api/v1/displayGroupInfo';
        await axios.get(url,{
          params: {
            open: 1,
          },                             
        }).then(
          res => {
            setloading(false);
            setstate(
              res.data.map(row => ({
                name: row.name,
                leader: row.leader,
                language: row.language,
                skill: row.skill,
              }))
            );
          }
        );
    }

    return <Table dataSource={data} columns={columns} />
}

export default ListGroup