import { Avatar, Box, Divider, Typography } from '@mui/material';
import { useListUsers } from 'app/api';
import { useState } from 'react';
import ChatBox from './ChatBox';
import UserList from './UserList';

const ChatComponent = () => {
    const [messages, setMessages] = useState([
        { id: 1, name: 'John Doe', avatar: '/assets/images/face-1.jpg', message: 'a', time: '3 sec ago' },
        { id: 2, name: 'Jacqueline Day', avatar: '/assets/images/faces/16.jpg', message: "Hi, I'm Jacqueline Day. Your imaginary friend.", time: '2 sec ago' },
    ]);
    const [userId, setUserId] = useState(null)
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                { id: messages.length + 1, name: 'John Doe', avatar: '/assets/images/face-1.jpg', message: newMessage, time: 'Just now' }
            ]);
            setNewMessage('');
        }
    };
    const [params, setParams] = useState({ reder: false });

    const data = useListUsers({ ...params }) || [];

    const onClick = (user_id) => {
        setUserId(user_id)
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '140px',
                color: '#fff',
                '& > .MuiBox-root > .MuiBox-root': {
                    p: 1,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                },
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `"sidebar main main main main main main"`,
                    m: 2
                }}
            >
                <Box sx={{ gridArea: 'sidebar', bgcolor: 'whitesmoke' }}>
                    <Box width="230px">
                        {/* Current User */}
                        <Box display="flex" alignItems="center" p={2}>
                            <Avatar src="/assets/images/face-1.jpg" />
                            <Typography sx={{ color: "black" }} variant="h5" ml={2}>
                                John Doe
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Scrollable User List */}
                        <Box sx={{ overflowY: 'auto', p: 2 }}>
                            {data.map((user, index) => (
                                <UserList _id={user._id} index={index} onClick={e => onClick(user._id)} userId={userId} />
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ gridArea: 'main', bgcolor: 'whitesmoke' }}>
                    <ChatBox user2_id={userId} />
                </Box>
            </Box>
        </Box>
    );
};

export default ChatComponent;
