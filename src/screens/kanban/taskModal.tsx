import { Input, Form, Button,Modal } from "antd"
import { useForm } from "antd/lib/form/Form"
import { TaskSelect } from "components/taskSelect"
import { UserSelect } from "components/userSelect"
import { useEffect } from "react"
import { useDeleteTask, useEditTask } from "utils/useTask"
import { useTaskModal } from "./util"

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

export const TaskModal = () => {
    const [form] = useForm()
    const { editingTask, close, editingTakId } = useTaskModal()
    const { mutateAsync:editTask, isLoading } = useEditTask()
    const { mutate:deleteTask, isLoading:deleteLoading } = useDeleteTask()

    const onOk = async () => {
        const valid = await form.validateFields(['name'])
        if(!valid.name){return}       
        await editTask({ ...editingTask, ...form.getFieldsValue() })
        close()
    }

    const onCancel = () => {
        close()
        form.resetFields()
    }

    const onDelete = ()=>{
        close()
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除任务吗',
            onOk: () => {
                deleteTask({ id:Number(editingTakId) })
               
            }
        })
    }

    // 监听数据变化改变表单
    useEffect(() => {
        form.setFieldsValue(editingTask)
    }, [editingTask, form])

    return (
        <Modal forceRender title={'编辑任务'} visible={!!editingTakId} okText={'确定'} cancelText={'取消'} confirmLoading={isLoading} onOk={onOk} onCancel={onCancel}>
            <Form {...layout} initialValues={editingTask} form={form} >
                <Form.Item label={'任务名'} name={'name'} rules={[{ required: true, message: '请输入任务名' }]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item label={'经办人'} name={'processorId'} >
                    <UserSelect defaultOptionName={'经办人'}></UserSelect>
                </Form.Item>
                <Form.Item label={'类型'} name={'typeId'} >
                    <TaskSelect></TaskSelect>
                </Form.Item>
            </Form>
            <div style={{textAlign:'right'}}>
                <Button loading={deleteLoading} onClick={()=>onDelete()}>删除</Button>
            </div>
        </Modal>
    )
}