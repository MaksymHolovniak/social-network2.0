import {Field, Formik, useFormik} from "formik";
import {FilterType} from "../../redux/users-reducer";
import {FC} from "react";
import s from './UsersSearchForm.module.css'
import React from 'react'
import {Button, Form, Input, Select, Space} from "antd";
import { SearchOutlined } from '@ant-design/icons';


type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

type PropsType = {
    filter: FilterType
    onFilterChanged: (filer: FilterType) => void
}


const UsersSearchForm: FC<PropsType> = React.memo((props) => {

    const submit = (values: FormType,  { setSubmitting } : {setSubmitting: (isSubmitting: boolean) => void  }   ) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        props.onFilterChanged(filter)
    }

    const formik = useFormik({
        initialValues: {term: props.filter.term, friend: String(props.filter.friend) as 'true' | 'false' | 'null'},
        onSubmit: (values, setSubmitting) => { submit(values, setSubmitting) }
    })

    return  (
    <Form  className={s.searchForm} onFinish={formik.handleSubmit}>
        <Input  rootClassName={s.formSeacrhInput}  placeholder = 'Login' id="term" name="term" value={formik.values.term} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Select
            id={'friend'}
            style={{ height: 40, width: 150 }}
            defaultValue="null"
            onChange={(value) => { formik.setFieldValue('friend', value); }}
            onBlur={formik.handleBlur}
            value={formik.values.friend}
            options={[
                { value: 'null', label: 'All' },
                { value: 'true', label: 'followed' },
                { value: 'false', label: 'Only unfollowed' },
            ]}
        />
        <Button type='primary' size={"large"} htmlType='submit' danger className={s.formSearchButton} icon={<SearchOutlined />}>Find</Button>

    </Form>
)})

export default  UsersSearchForm