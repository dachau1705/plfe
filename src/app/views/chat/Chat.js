import { Avatar, Box, Divider, Typography } from '@mui/material';
import { useListBoxChat } from 'app/api';
import { useState } from 'react';
import ChatBox from './ChatBox';
import Group from './Group';
import LongMenu from './MenuChat';

const ChatComponent = () => {
    const [userId, setUserId] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [params, setParams] = useState({ reder: false });
    const [groupInfo, setGroupInfo] = useState({});
    // const data = useListUsers({ ...params }) || [];
    const lisGroup = useListBoxChat({ ...params }) || [];

    const onClick = (group) => {
        setSelectedGroup(group);
    };

    return (
        <Box>
            <Box
                sx={{
                    width: '100%',
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
                        gridTemplateColumns: '1fr 3fr',  // Sidebar takes 1/4th and ChatBox takes 3/4th
                        gap: 1,
                        gridTemplateRows: 'auto',
                        gridTemplateAreas: `"sidebar main"`,  // Sidebar and ChatBox in a single row
                        m: 2,
                    }}
                >
                    {/* Sidebar */}
                    <Box sx={{ gridArea: 'sidebar', bgcolor: 'whitesmoke' }}>
                        <Box
                            sx={{
                                height: "100%", // Ensure the container takes up the full height of the viewport
                                display: "flex",
                                flexDirection: "column",
                                background: "#fff",
                            }}
                        >
                            {/* Fixed Header */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 2,
                                    bgcolor: 'whitesmoke',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                <Avatar src="/assets/images/face-1.jpg" />
                                <Typography sx={{ color: "black" }} variant="h5" ml={2}>
                                    John Doe
                                </Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <LongMenu sx={{ mx: 2 }} />
                            </Box>
                            <Divider />
                            <Box sx={{
                                height: "100%",
                                flexDirection: "column",
                                background: "#fff",
                                padding: "16px",  // Add some padding for better spacing of messages
                            }}>
                                <Box
                                    sx={{
                                        p: 2,
                                    }}
                                >
                                    {
                                        lisGroup.map((group, index) => (
                                            group.type === 'single' ? (
                                                <Group
                                                    key={group._id}
                                                    group={group}
                                                    index={index}
                                                    onClick={() => onClick(group)}
                                                    selectedGroup={selectedGroup}
                                                />
                                            ) : null
                                        ))
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* ChatBox */}
                    <Box sx={{ gridArea: 'main', bgcolor: 'whitesmoke', height: '100%' }}>
                        {selectedGroup && <ChatBox user2_id={userId} group={selectedGroup} />}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatComponent;
