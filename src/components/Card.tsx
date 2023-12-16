import {
  JSX,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useId,
} from "react";
import { Quotes as Q } from "../model/model";

import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import IconButton from "@mui/material/IconButton";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SellIcon from "@mui/icons-material/Sell";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Swal from "sweetalert2";
import withReactContent, { ReactSweetAlert } from "sweetalert2-react-content";
const MySwal: ReactSweetAlert = withReactContent(Swal);

import bg from "../assets/black-glistening-background.jpg"

interface BtnProps {
  setClick: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

interface ContentProps extends BtnProps {
  content: Q;
}

const BtnRandom: FC<BtnProps> = ({ setClick, loading }): JSX.Element => {
  return (
    <>
      {loading ? (
        <LoadingButton
          loading
          loadingPosition="center"
          variant="outlined"
          sx={{ marginInline: "auto", width: "70%" }}
          disabled
        >
          random
        </LoadingButton>
      ) : (
        <Button
          variant="contained"
          size="large"
          startIcon={<SearchIcon />}
          sx={{ marginInline: "auto", width: "70%" }}
          onClick={(): void => setClick(true)}
        >
          random
        </Button>
      )}
    </>
  );
};

const Content: FC<ContentProps> = ({
  content,
  loading,
  setClick,
}): JSX.Element => {
  const [data, setData] = useState<Q>(content);
  const [tags, setTags] = useState<string>("");
  const cardId: string = useId();
  const authorId: string = useId();

  const {
    speechSynthesis,
    navigator: { clipboard },
  }: Window = window;

  useEffect((): void => {
    setData(content);
    setTags(
      content.tags.length === 0 ? "" : content.tags.slice(1, 4).join(" , ")
    );
  }, [content]);

  const handleCopyText = (text: string): void => {
    clipboard.writeText(text).then((): void => {
      setTimeout((): void => {
        MySwal.fire({
          icon: "success",
          text: "Successfully copied text!",
          showConfirmButton: false,
          timer: 1300,
        });
      }, 400);
    });
  };

  const handleSpeech = (text: string): void => {
    // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/lang
    const speech: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.6;
    speech.pitch = 2;
    try {
      speechSynthesis.speak(speech);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <Card
      id={`${cardId}${data.id}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "660px",
        maxWidth: "560px",
        height: "max-content",
        padding: "60px",
        textAlign: "start",
        margin: "70px auto",
        cursor: "default",
        borderRadius: "14px",
        borderColor: "grey.500",
        boxShadow: 10,
      }}
    >
      <CardContent
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          color: "white",
          marginBottom: "20px",
          borderRadius: "14px",
        }}
      >
        <Typography variant="h5" component="div">
          {loading ? (
            <>
              <Skeleton variant="text" sx={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.918)" }} />
              <Skeleton variant="text" sx={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.918)" }} />
              <Skeleton variant="text" sx={{ width: "70%", backgroundColor: "rgba(255, 255, 255, 0.918)" }} />
            </>
          ) : (
            <blockquote>
              "{data.content}"
            </blockquote>
          )}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }}
      >
        {loading ? (
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "60%" }} />
        ) : (
          <Typography component="div" sx={{ width: "50%"}}>
            <Box component="div" display="flex" textAlign="center">
              <Tooltip title="speak">
                <IconButton
                  onClick={(): void => handleSpeech(data.content)}
                  sx={{ marginInline: "0 6px" }}
                >
                  <RecordVoiceOverIcon />
                </IconButton>
              </Tooltip>
              {tags === "" ? (
                ""
              ) : (
                <Tooltip title="tags reference">
                  <IconButton
                    sx={{
                      marginInline: "0 7px",
                      padding: "0",
                      fontSize: "16px",
                      textIndent: "3px",
                    }}
                    size="small"
                  >
                    <SellIcon />
                    {tags}
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Typography>
        )}
        <Typography
          component="h5"
          align="right"
          color="primary.main"
          sx={{ textAlign: "right", cursor: "default", width: "50%" }}
        >
          {loading ? (
            <Skeleton variant="text" sx={{ width: "30%" }} />
          ) : (
            <a
              href={data.url}
              target="_blank"
              id={`${authorId}${data.originator.master_id}`}
            >
              {data.originator.name}
            </a>
          )}
        </Typography>
      </CardActions>
      <CardActions>
        <Box
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "70px",
            margin: "15px 0",
          }}
        >
          <BtnRandom setClick={setClick} loading={loading} />
          <Button
            startIcon={<ContentCopyIcon/>}
            variant="outlined"
            color="success"
            sx={{ margin: "15px auto", width: "70%" }}
            onClick={(): void => handleCopyText(data.content)}
          >
            copy quotes
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Content;
