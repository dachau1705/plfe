import { Box, styled } from '@mui/material';
import { useUserDetail } from 'app/api';
import { ChatAvatar } from 'app/components';
import { H5 } from 'app/components/Typography';

const ChatStatus = styled("div")(({ theme }) => ({
    marginLeft: "12px",
    color: theme.palette.primary.main,
    "& h5": {
        marginTop: 0,
        fontSize: "14px",
        marginBottom: "3px",
    },
    "& span": { fontWeight: "500" },
}));

const UserList = ({ _id, index, onClick, userId }) => {
    const detail = useUserDetail(_id);
    return (
        <Box
            key={index}
            display="flex"
            alignItems="center"
            mb={2}
            onClick={onClick}
            sx={{
                bgcolor: _id === userId ? "grey" : "white",
                borderRadius: '20px',
                transition: 'background-color 0.3s ease', // Tạo hiệu ứng chuyển đổi mượt mà
                '&:hover': {
                    bgcolor: 'lightgrey', // Màu nền khi hover
                    cursor: 'pointer',    // Thay đổi con trỏ khi hover
                },
            }}
        >
            <ChatAvatar src={detail?.userInfo?.avatar || null} status="online" />
            <ChatStatus>
                <H5 sx={{ color: "black" }}>{detail?.userInfo?.firstName + ' ' + detail?.userInfo?.lastName}</H5>
            </ChatStatus>
        </Box>
    );
};

export default UserList;
