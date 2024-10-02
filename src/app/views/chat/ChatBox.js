import { Attachment, MoreVert, TagFaces } from "@mui/icons-material";
import {
    Avatar,
    Box,
    IconButton,
    styled,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import { useListMessage, useUserDetail } from "app/api";
import { H5 } from "app/components/Typography";
import { convertHexToRGB } from "app/utils/utils";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import io from "socket.io-client";

// Kết nối tới server socket.io
const socket = io(process.env.REACT_APP_API_URL);

// STYLED COMPONENTS
const ChatContainer = styled("div")({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
});

const ChatHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    backgroundColor: "#f5f5f5",
    borderBottom: `1px solid rgba(${convertHexToRGB(theme.palette.text.primary)}, 0.15)`,
    position: "sticky",
    top: 0,
    zIndex: 1,
}));

const StyledScrollBar = styled(ScrollBar)({
    flexGrow: 1,
    // overflowY: "auto", // Ensure chat messages scroll independently
    height: 0, // Important to ensure the container takes up full available space
});

const ChatMessage = styled("div")(({ theme, isSender }) => ({
    padding: "8px",
    maxWidth: 240,
    fontSize: "14px",
    borderRadius: "4px",
    marginBottom: "8px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: theme.palette.primary.main,
    background: "#fafafa",
    alignSelf: isSender ? "flex-end" : "flex-start",
    backgroundColor: isSender ? "#E0F7FA" : "#F0F4C3",
}));

const MessageTime = styled("span")(({ theme }) => ({
    fontSize: "13px",
    fontWeight: "500",
    color: theme.palette.primary.main,
}));

const ChatFooter = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px",
    backgroundColor: "#fafafa",
    borderTop: `1px solid rgba(${convertHexToRGB(theme.palette.text.primary)}, 0.15)`,
    position: "sticky",
    bottom: 0, // Ensure the footer stays at the bottom
}));

const ChatBox = ({ user2_id, group }) => {
    const detail = useUserDetail(user2_id);
    const userInfor = detail.userInfo;
    const user1_id = Cookies.get("user_id");
    const roomId = group._id;
    const members = group.members;
    const userId = Cookies.get('user_id');
    const targetMember = members.filter(m => m.userId !== userId);
    const detailMember = useUserDetail(targetMember[0].userId);

    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const chat = useListMessage(group._id); // Get chat messages for the group

    // Update message list when group._id changes
    useEffect(() => {
        if (chat) {
            setMessageList([...chat]);
        } else {
            setMessageList([]);
        }
    }, [chat, group._id]); // Ensure that message list updates when the group ID or chat changes

    useEffect(() => {
        socket.emit('join_room', { room_id: group._id });
        socket.on("message", (messageObject) => {
            setMessageList((prevMessages) => [...prevMessages, messageObject]);
        });
        return () => {
            socket.off("message");
        };
    }, [group]);

    const sendMessageOnEnter = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            let tempMessage = message.trim();
            if (tempMessage !== "") {
                const messageObject = {
                    sender_id: user1_id,
                    receiver_id: targetMember,
                    text: tempMessage,
                    room_id: roomId,
                    timestamp: new Date(),
                    is_read: false,
                };
                socket.emit("message", { roomId: group._id, data: messageObject });
                setMessage("");
            }
        }
    };

    const { palette } = useTheme();
    const primary = palette.primary.main;

    return (
        <ChatContainer>
            {/* Chat Header */}
            <ChatHeader>
                <Box display="flex" alignItems="center">
                    <Avatar src={group.type === 'single' ? detailMember?.userInfo?.avatar : group.avatarGroup} />
                    <Box ml={2}>
                        <H5 mb={0.5} fontSize={18} color={primary}>
                            {group.type === 'single' ? detailMember?.userInfo?.firstName + ' ' + detailMember?.userInfo?.lastName : group.groupName}
                        </H5>
                        <Typography variant="body2" color="textSecondary">
                            {userInfor?.status || "Active now"}
                        </Typography>
                    </Box>
                </Box>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </ChatHeader>

            {/* Chat Messages */}
            <StyledScrollBar id="chat-scroll">
                {messageList.map((item, ind) => (
                    <Box
                        key={ind}
                        p="20px"
                        display="flex"
                        sx={{
                            justifyContent:
                                user1_id === item.sender_id ? "flex-end" : "flex-start",
                        }}
                    >
                        {user1_id !== item.sender_id && <Avatar src={group.type === 'single' ? detailMember?.userInfo?.avatar : group.avatarGroup} />}
                        <Box ml="12px">
                            {user1_id !== item.sender_id && (
                                <H5 mb={0.5} fontSize={14} color={primary}>
                                    {item.name}
                                </H5>
                            )}
                            <ChatMessage isSender={user1_id === item.sender_id}>
                                {item.text}
                            </ChatMessage>
                            <MessageTime>{new Date(item.timestamp).toLocaleTimeString()}</MessageTime>
                        </Box>
                    </Box>
                ))}
            </StyledScrollBar>

            {/* Chat Footer */}
            <ChatFooter>
                <TextField
                    multiline
                    fullWidth
                    maxRows={4}
                    value={message}
                    placeholder="Type here ..."
                    onKeyUp={sendMessageOnEnter}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{ "& textarea": { color: primary } }}
                    InputProps={{
                        endAdornment: (
                            <Box display="flex">
                                <IconButton size="small">
                                    <TagFaces />
                                </IconButton>
                                <IconButton size="small">
                                    <Attachment />
                                </IconButton>
                            </Box>
                        ),
                    }}
                />
            </ChatFooter>
        </ChatContainer>
    );
};

export default ChatBox;
