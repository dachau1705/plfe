import { Attachment, TagFaces } from "@mui/icons-material";
import {
    Avatar,
    Box,
    IconButton,
    styled,
    TextField,
    useTheme
} from "@mui/material";
import { useUserDetail } from "app/api";
import { H5 } from "app/components/Typography";
import { convertHexToRGB } from "app/utils/utils";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import io from "socket.io-client";

// Kết nối tới server socket.io
const socket = io("http://localhost:4000");

// STYLED COMPONENTS
const ChatContainer = styled("div")({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
});

const StyledScrollBar = styled(ScrollBar)({
    flexGrow: 1,
    overflowY: 'auto', // Cho phép cuộn
});

const ProfileBox = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 12px 12px 20px",
    color: theme.palette.primary.main,
    background: "#fafafa",
}));

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
    bottom: 0, // Đảm bảo vị trí cố định dưới cùng
}));

const ChatBox = ({ user2_id }) => {
    const detail = useUserDetail(user2_id);
    const userInfor = detail.userInfo;
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const user1_id = Cookies.get("user_id");

    const roomId = [user1_id, user2_id].sort().join('_');

    useEffect(() => {
        socket.emit('join_room', { user1_id, user2_id });
        socket.on("message", (messageObject) => {
            setMessageList((prevMessages) => [...prevMessages, messageObject]);
        });
        return () => {
            socket.off("message");
        };
    }, [user1_id, user2_id]);

    const sendMessageOnEnter = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            let tempMessage = message.trim();
            if (tempMessage !== "") {
                const messageObject = {
                    sender_id: user1_id,
                    receiver_id: user2_id,
                    text: tempMessage,
                    room_id: roomId,
                    timestamp: new Date(),
                    is_read: false,
                };
                socket.emit("message", { roomId, data: messageObject });
                setMessage("");
            }
        }
    };

    const { palette } = useTheme();
    const primary = palette.primary.main;

    return (
        <ChatContainer>
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
                        {user1_id !== item.sender_id && <Avatar src={userInfor.avatar} />}
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
