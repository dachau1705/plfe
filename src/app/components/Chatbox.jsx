import { Attachment, Clear, TagFaces } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  styled,
  TextField,
  useTheme,
} from "@mui/material";
import { ChatAvatar } from "app/components";
import { convertHexToRGB } from "app/utils/utils";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import io from "socket.io-client";
import { H5, Span } from "./Typography";

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
  alignSelf: isSender ? "flex-end" : "flex-start", // Điều chỉnh tin nhắn căn trái/phải
  backgroundColor: isSender ? "#E0F7FA" : "#F0F4C3", // Màu nền cho tin nhắn gửi đi và nhận về
}));

const MessageTime = styled("span")(({ theme }) => ({
  fontSize: "13px",
  fontWeight: "500",
  color: theme.palette.primary.main,
}));

const ChatImgContainer = styled("div")({
  padding: "20px",
  display: "flex",
  justifyContent: "flex-end",
});

const ChatImgBox = styled("div")(({ theme }) => ({
  padding: "8px",
  fontSize: "14px",
  maxWidth: 240,
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  color: theme.palette.primary.main,
  background: "#fafafa",
}));

const ChatImg = styled("img")(() => ({ width: "40px" }));

export default function Chatbox({ togglePopup }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const currentUserId = Cookies.get("user_id");

  useEffect(() => {
    // Lắng nghe sự kiện 'message' từ server
    socket.on("message", (messageObject) => {
      console.log(messageObject);

      setMessageList((prevMessages) => [...prevMessages, messageObject]);
    });

    // Ngắt kết nối socket khi component unmount
    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessageOnEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      let tempMessage = message.trim();
      if (tempMessage !== "") {
        let messageObject = {
          text: tempMessage,
          contactId: currentUserId,
          time: new Date(),
          lasted: true, // Tin nhắn mới nhất
        };

        // Cập nhật tất cả các tin nhắn cũ thành lasted: false
        const updatedMessages = messageList.map((msg) => ({
          ...msg,
          lasted: false,
        }));

        // Gửi tin nhắn đến server thông qua socket
        socket.emit("message", messageObject);

        // Cập nhật tin nhắn trên giao diện người dùng với tin nhắn mới nhất là lasted: true
        setMessageList([...updatedMessages]);

        // Reset lại nội dung tin nhắn trong input
        setMessage("");
      }
    }
  };

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const textPrimary = palette.text.primary;
  console.log(messageList);

  return (
    <ChatContainer>
      <ProfileBox>
        <Box display="flex" alignItems="center">
          <ChatAvatar src="/assets/images/face-2.jpg" status="online" />
          <ChatStatus>
            <H5>Ryan Todd</H5>
            <Span>Active</Span>
          </ChatStatus>
        </Box>
        <IconButton onClick={togglePopup}>
          <Clear fontSize="small" />
        </IconButton>
      </ProfileBox>
      <StyledScrollBar id="chat-scroll">
        {messageList.map((item, ind) => (
          <Box
            key={ind}
            p="20px"
            display="flex"
            sx={{
              justifyContent:
                currentUserId === item.contactId ? "flex-end" : "flex-start", // Căn tin nhắn gửi đi và nhận về
            }}
          >
            {currentUserId !== item.contactId && <Avatar src={item.avatar} />}
            <Box ml="12px">
              {currentUserId !== item.contactId && (
                <H5 mb={0.5} fontSize={14} color={primary}>
                  {item.name}
                </H5>
              )}
              <ChatMessage
                isSender={currentUserId === item.contactId ? true : false}
              >
                {item.text}
              </ChatMessage>
              {item.lasted ? <MessageTime>1 minute ago</MessageTime> : null}
            </Box>
          </Box>
        ))}
      </StyledScrollBar>

      <div>
        <Divider
          sx={{ background: `rgba(${convertHexToRGB(textPrimary)}, 0.15)` }}
        />

        <TextField
          multiline
          fullWidth
          rowsMax={4}
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
            classes: { root: "pl-5 pr-3 py-3 text-body" },
          }}
        />
      </div>
    </ChatContainer>
  );
}
