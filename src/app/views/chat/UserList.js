import { Avatar, Box, Typography } from '@mui/material';
import { useUserDetail } from 'app/api';

const UserList = ({ _id, index, onClick, userId }) => {
    const detail = useUserDetail(_id);
    console.log(detail);

    return (
        <Box key={index} display="flex" alignItems="center" mb={2} onClick={onClick} sx={{ bgcolor: _id === userId ? "grey" : "white", borderRadius: '20px' }}>
            <Avatar src={detail?.userInfo?.avatar || null} />
            <Box ml={2}>
                <Typography variant="body1" color="black">{detail?.userInfo?.firstName + ' ' + detail?.userInfo?.lastName}</Typography>
                <Typography variant="body2" color="black">{detail?.date}</Typography>
            </Box>
        </Box>
    );
};

export default UserList;
