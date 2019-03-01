import React from 'react'
import { Table } from 'antd'
import "./index.scss"
export default class ETable extends React.Component {

    state = {}
    //处理行点击事件
    onRowClick = (record, index) => {
        this.props.updateSelectedItem([index], record, []);
    };

    // 选择框变更
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.updateSelectedItem(selectedRowKeys, selectedRows[0], []);
    };

    onSelectAll = (selected, selectedRows, changeRows) => {
        let selectedIds = [];
        let selectKey = [];
        selectedRows.forEach((item, i) => {
            selectedIds.push(item.id);
            selectKey.push(i);
        });
        this.props.updateSelectedItem(selectKey, selectedRows[0] || {}, selectedIds);
    }

    getOptions = () => {
        const { selectedRowKeys } = this.props;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect: (record, selected, selectedRows) => {

            },
            onSelectAll: this.onSelectAll
        };
        return <Table
            className="card-wrap page-table"
            bordered
            {...this.props}
            rowSelection={rowSelection}
            onRow={(record, index) => ({
                onClick: () => {
                    this.onRowClick(record, index)
                }
            })}
        />
    };
    render = () => {
        return (
            <div>
                {this.getOptions()}
            </div>
        )
    }
}