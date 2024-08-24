import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Typography } from "@mui/material";
import { post } from "api/api";
import { listToast } from "constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setToast } from "../../redux/feature";

export const FormUpdate = (props) => {
    const {
        checkId,
        title,
        handleData,
        actions,
        className,
        route,
        refreshObjects,
        setVisible,
        setResident,
        setParams,
        handleAfterCallApi,
        disabled,
        buttonLabel,
        handleSubmit,
        isFormData,
        ...prop
    } = props
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState(() => {
        return location.search
    })

    async function fetchDataSubmit(info) {
        if (checkId) {
            const response = await post(actions.update, {
                ...info
            }, isFormData)
            console.log(response);

            if (response) setLoading(false)
            if (response.status) {
                if (route) navigate(route + query)
                if (setParams) {
                    setParams((pre) => {
                        return { ...pre, render: !pre.render }
                    })
                }
                if (handleAfterCallApi) handleAfterCallApi()
                if (setVisible) setVisible((pre) => !pre)
                dispatch(setToast({ ...listToast[0], detail: `Update ${title || 'data'} successfully!` }))
            }
            else dispatch(setToast({ ...listToast[1], detail: response.data.mess }))
        } else {
            const response = await post(actions.add, {
                ...info
            }, isFormData)
            if (response) setLoading(false)
            if (response.status) {
                if (route) navigate(route + query)
                if (setParams) {
                    setParams((pre) => {
                        return { ...pre, render: !pre.render }
                    })
                }
                if (handleAfterCallApi) handleAfterCallApi()
                if (setVisible) setVisible((pre) => !pre)
                dispatch(setToast({ ...listToast[0], detail: `Add ${title || 'data'} successfully!` }))
            }
            else dispatch(setToast({ ...listToast[1], detail: response.data.mess }))
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const info = handleData(e)
        if (typeof info === 'string') {
            setLoading(false)
            if (info) dispatch(setToast({ ...listToast[1], detail: info }))
        } else {
            fetchDataSubmit(info)
        }
    }
    return (
        // <div className={classNames({ card: !setVisible }, className)} {...prop}>
        <form onSubmit={onSubmit}>
            {title && (
                <Box
                    display="flex"
                    alignItems="center"
                    mb={4}
                    sx={{
                        height: '50px',
                        borderBottom: '2px solid #dee2e6',
                    }}
                >
                    <Typography variant="h6" component="b" sx={{ p: 0 }}>
                        {checkId ? 'Detail' : 'Add New'} {title}
                    </Typography>
                </Box>
            )}
            <Box>
                {props.children}
            </Box>
            <Box display="flex" justifyContent="end" gap={3}>
                {(route || setVisible) && (
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        startIcon={setVisible ? <CloseIcon /> : null}
                        onClick={() => {
                            if (route && !setVisible) {
                                if (query && !setVisible) navigate(route + query);
                                else navigate(-1);
                            } else {
                                setVisible(false);
                            }
                        }}
                    >
                        {setVisible ? 'Close' : 'Return'}
                    </Button>
                )}
                {actions && (
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        color="info"
                        startIcon={<SaveIcon />}
                    >
                        {buttonLabel ? buttonLabel : setVisible ? 'CONFIRM' : checkId ? 'UPDATE' : 'ADD'}
                    </Button>
                )}
            </Box>
        </form>
        // </div>
    )
}
