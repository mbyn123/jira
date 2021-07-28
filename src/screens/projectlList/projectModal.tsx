import styled from "@emotion/styled"
import { Button, Drawer, Form, Input, Spin } from "antd"
import { useForm } from "antd/lib/form/Form"
import { ErrorBox } from "components/lib"
import { UserSelect } from "components/userSelect"
import { useEffect } from "react"
import { useEditProject, useAddProject } from "utils/useProject"
import { useProjectModal } from "./util"

export const ProjectModal = () => {

    const { projectModalOpen, close, isLoading, editingProject } = useProjectModal()
    const [form] = useForm()
    const title = editingProject ? '编辑项目' : '新增项目'
    const useMutateProject = editingProject ? useEditProject : useAddProject
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()
    // mutateAsync 是react-query中返回的当前异步请求法
    const onFinish = (value: any) => {
        mutateAsync({ ...editingProject, ...value }).then(() => {
            form.resetFields()
            close()
        })
    }
    

    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [editingProject, form]);

    const closeModal = ()=>{
        form.resetFields()
        close()
    }

    return (
        <Drawer forceRender width={'100%'} visible={projectModalOpen} onClose={closeModal}>
            <Contatial>
                {
                    isLoading ? (
                        <Spin size={'large'}></Spin>
                    ) : (
                        <>
                            <h2>{title}</h2>
                            <ErrorBox error={error}></ErrorBox>
                            <Form layout={'vertical'} onFinish={onFinish} form={form} style={{width:'20%'}}>
                                <Form.Item label={'部门'} name={'organization'} rules={[{ required: true, message: '请输入部门名称' }]}>
                                    <Input></Input>
                                </Form.Item>
                                <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: '请输入项目名称' }]}>
                                    <Input></Input>
                                </Form.Item>
                                <Form.Item label={'负责人'} name={'personId'} rules={[{ required: true, message: '请选择负责人' }]}>
                                    <UserSelect defaultOptionName={'负责人'}></UserSelect>
                                </Form.Item>
                                <Form.Item style={{textAlign:'right'}}>
                                    <Button loading={mutateLoading} type={'primary'} htmlType={'submit'}>提交</Button>
                                </Form.Item>
                            </Form>
                        </>
                    )
                }
            </Contatial>
        </Drawer>
    )
}

const Contatial = styled.div`
width: 100%;
height: 80vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`