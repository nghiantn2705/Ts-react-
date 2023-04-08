import React,{useState,useEffect, useRef} from 'react';
import { IProduct } from '../../../types/products';
import { SearchOutlined } from '@ant-design/icons';
import { InputRef, message } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import useStore from '../../../shared/hooks/use-store';
import { DeleteProduct, getAllProducts } from '../../../api/product';



interface IProps {
    products:IProduct[],
    onRemove: (id:number) => void
}
const DashBroad = () => {
  const [products, setProducts] = useStore<IProduct[]>('products');

    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res.data);
        }).catch((ex) => {
            message.error(ex?.message || 'Looix');
        })
    }, [])
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },


  });

    interface DataType {
      _id: string;
      key:any;
      name: string;
      price: number;
  description: string;
image: string;
categoryId:string

  }
  const removeProduct = (id:number)=>{
    DeleteProduct(id)
  }
    const columns: ColumnsType<DataType> = [
      {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
      ...getColumnSearchProps('name'),
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Product Price',
        dataIndex: 'price',
        key: 'price',
        width: '20%',
      },
      {
        title: 'Image Product',
        dataIndex: 'image',
        key: 'image',
        render: (image) => <img src={image} alt="" style={{width:"150px"}} sizes="" />,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'CategoryId',
        dataIndex: 'categoryId',
        key: 'categoryId',
        render: (item) => <span>{item.nameCategory}</span>
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Space  size="middle">
              <Button type="primary" style={{backgroundColor:'red'}} onClick={()=>removeProduct(record._id)}>Remove</Button>
              <a href={`/admin/dashbroad/updateproduct/${record._id}`}><Button type="primary" style={{backgroundColor:'red'}} >Update</Button></a>
            </Space>
          </Space>
        ),
      },
    ];

    
    const data: Datatype[] = products?.map((item)=>{
      return {
        key: item.id,
        ...item
      }
    }) || []
    console.log(data);
  return  <Table columns={columns} dataSource={products} pagination={{pageSize:12}} />
}

export default DashBroad
