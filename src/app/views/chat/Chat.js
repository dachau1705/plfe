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
    const lisGroup = useListBoxChat({ ...params }) || [];

    const onClick = (group) => {
        setSelectedGroup(group);
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 3fr',  // Sidebar takes 1/4th and ChatBox takes 3/4th
                    gap: 1,
                    gridTemplateRows: '1fr',  // Full height for both sections
                    gridTemplateAreas: `"sidebar main"`,
                    flexGrow: 1,
                }}
            >
                {/* Sidebar */}
                <Box sx={{ gridArea: 'sidebar', bgcolor: 'whitesmoke', height: '100%' }}>
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
                        {/* Scrollable Group List */}
                        <Box sx={{
                            flexGrow: 1,
                            overflowY: "auto", // Scrollable area for the list of groups
                            p: 2, // Add some padding for better spacing
                            height: 0, // Important to ensure it calculates height based on flex-grow
                        }}>
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

                {/* ChatBox */}
                <Box sx={{ gridArea: 'main', bgcolor: 'whitesmoke', height: '100%' }}>
                    {selectedGroup && <ChatBox user2_id={userId} group={selectedGroup} />}
                </Box>
            </Box>
        </Box>
    );
};

export default ChatComponent;
