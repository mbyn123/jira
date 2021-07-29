import styled from "@emotion/styled"
import { Button, Drawer, DrawerProps, Form, Input } from "antd"
import { useForm } from "antd/lib/form/Form"
import { ErrorBox } from "components/lib"
import { useAddEpic } from "http/useEpic"
import { useProjectIdInUrl } from "screens/kanban/util"

export const CreateEpic = (props: Pick<DrawerProps, 'visible'> & { onClose: () => void }) => {
    const {mutateAsync,isLoading,error} = useAddEpic()
    const [form] = useForm()
    const projectId = useProjectIdInUrl()
    const onFinish = async (value:{name:string})=>{
       await mutateAsync({...value,projectId})
       props.onClose()
    }
    return (
        <Drawer visible={props.visible} onClose={props.onClose} width={'100%'}>
           <Contatial>
           <ErrorBox error={error}></ErrorBox>
            <Form layout={'vertical'} onFinish={onFinish} form={form} style={{ width: '20%' }}>
                <Form.Item label={'任务组名称'} name={'name'} rules={[{ required: true, message: '请输入任务组名称' }]}>
                    <Input></Input>
                </Form.Item>
              
                <Form.Item style={{ textAlign: 'right' }}>
                    <Button loading={isLoading} type={'primary'} htmlType={'submit'}>提交</Button>
                </Form.Item>
            </Form>

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