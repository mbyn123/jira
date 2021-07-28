import { Input, Form } from "antd"
import { useForm } from "antd/lib/form/Form"
import Modal from "antd/lib/modal/Modal"
import { TaskSelect } from "components/taskSelect"
import { UserSelect } from "components/userSelect"
import { useEffect } from "react"
import { useEditTask } from "utils/useTask"
import { useTaskModal } from "./util"

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

export const TaskModal = () => {
    const [form] = useForm()
    const { editingTask, close, editingTakId } = useTaskModal()
    const { mutateAsync, isLoading } = useEditTask()

    const onOk = async () => {
        const valid = await form.validateFields(['name'])
        if(!valid.name){return}       
        await mutateAsync({ ...editingTask, ...form.getFieldsValue() })
        close()
    }

    const onCancel = () => {
        close()
        form.resetFields()
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
        </Modal>
    )
}