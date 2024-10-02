import { Box, styled } from '@mui/material';
import { useUserDetail } from "app/api";
import { ChatAvatar } from 'app/components';
import { H5 } from 'app/components/Typography';
import Cookies from "js-cookie";

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

const Group = ({ group, index, onClick, selectedGroup }) => {
  const members = group.members
  const userId = Cookies.get('user_id');
  const targetMember = members.filter(m => m.userId !== userId)
  const detail = useUserDetail(targetMember[0].userId);

  return (
    <Box
      key={index}
      display="flex"
      alignItems="center"
      mb={2}
      onClick={onClick}
      sx={{
        bgcolor: group === selectedGroup ? "grey" : "white",
        borderRadius: '20px',
        transition: 'background-color 0.3s ease', // Tạo hiệu ứng chuyển đổi mượt mà
        '&:hover': {
          bgcolor: 'lightgrey', // Màu nền khi hover
          cursor: 'pointer',    // Thay đổi con trỏ khi hover
        },
      }}
    >
      <ChatAvatar src={group.type === 'single' ? detail?.userInfo?.avatar : group.avatarGroup} status="online" />
      <ChatStatus>
        <H5 sx={{ color: "black" }}>{group.type === 'single' ? detail?.userInfo?.firstName + ' ' + detail?.userInfo?.lastName : group.groupName}</H5>
      </ChatStatus>
    </Box>
  );
}

export default Group
