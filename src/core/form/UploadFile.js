import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 300px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 5px;
  background-color: white;
`;

const Header = styled.div`
  flex: 1;
  width: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    height: 100px;
  }

  p {
    text-align: center;
    color: black;
  }
`;

const Footer = styled.label`
  background-color: rgba(0, 110, 255, 0.075);
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: black;
  border: none;

  svg {
    height: 130%;
    fill: black;
    background-color: rgba(70, 66, 66, 0.103);
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
  }

  p {
    flex: 1;
    text-align: center;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #ddd;
`;

const ClearButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d33;
  }
`;

const ImageUploadComponent = ({ file, setFile }) => {
  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview)
    }
  }, [file])
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setFile(file);
    }
  };

  const handleClear = () => {
    setFile(null);
  };

  return (
    <Container>
      <Header>
        {!file ? (
          <>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Browse Image to upload!</p>
          </>
        ) : (
          <PreviewImage src={typeof file === "string" ? file : file.preview} alt="Image Preview" />
        )}
      </Header>

      <Footer htmlFor="file">
        <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
          <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
        </svg>
        <p>{file?.name || "Not selected file"}</p>
      </Footer>

      <HiddenInput id="file" type="file" onChange={handleFile} />

      {file && <ClearButton onClick={handleClear}>Clear Image</ClearButton>}
    </Container>
  );
};

export default ImageUploadComponent;
