import { RootState } from "@/global/states/store";
import { setIsSearchbarVisible, setSearch } from "@/global/states/view.slice";
import { setPage as setReviewPage } from "@/review/review.slice";
import { ActionIcon, Group, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getSearchTextInput } from "@/global/styles/global.styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  border,
  circularBorder,
  inputStyles,
  oneBg,
} from "@/global/styles/app.css";
import { I } from "../components";

export const SearchLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);
  const { pid, rwid } = useParams();

  const { search, isMobile, width } = useSelector(
    (state: RootState) => state.view
  );

  const {
    sort: reviewSort,
    order: reviewOrder,
    rating: reviewRating,
  } = useSelector((state: RootState) => state.review);

  let placeholder = "Search...";
  if (location.pathname.includes("reviews/packageId"))
    placeholder = "Search reviews";
  if (location.pathname.includes("reviews/reviewerId"))
    placeholder = "Search reviews";

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    if (search) {
      if (location.pathname.includes("reviews/packageId")) {
        dispatch(setReviewPage(1));
        navigate(
          `/reviews/packageId/${pid}/search/${search}?page=1&sort=${reviewSort}&order=${reviewOrder}&rating=${reviewRating}`
        );
      }

      if (location.pathname.includes("reviews/reviewerId")) {
        dispatch(setReviewPage(1));
        navigate(
          `/reviews/reviewerId/${rwid}/search/${search}?page=1&sort=${reviewSort}&order=${reviewOrder}&rating=${reviewRating}`
        );
      }
    }
  }, [search]);

  const handleClearSearch = (event: any) => {
    event.preventDefault();
    dispatch(setSearch(""));

    if (location.pathname.includes("reviews/packageId")) {
      dispatch(setReviewPage(1));
      navigate(
        `/reviews/packageId/${pid}?page=1&sort=${reviewSort}&order=${reviewOrder}&rating=${reviewRating}`
      );
    }

    if (location.pathname.includes("reviews/reviewerId")) {
      dispatch(setReviewPage(1));
      navigate(
        `/reviews/reviewerId/${rwid}?page=1&sort=${reviewSort}&order=${reviewOrder}&rating=${reviewRating}`
      );
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!event.target.value) handleClearSearch(event);
    else dispatch(setSearch(event.target.value));
  };

  const handleBlur = () => {
    dispatch(setIsSearchbarVisible(false));
  };

  return (
    <Group justify="center" align="center" h="100%">
      <TextInput
        bg={oneBg}
        value={search}
        ref={inputRef}
        classNames={{
          input: `${inputStyles} ${border} ${circularBorder}`,
        }}
        styles={
          isMobile
            ? getSearchTextInput(isMobile, width)
            : {
                input: {
                  height: 50,
                  minWidth: 500,
                  margin: 4,
                },
              }
        }
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        rightSection={
          <>
            {search && (
              <ActionIcon size="xs" onMouseDown={handleClearSearch}>
                <I I={IconX} />
              </ActionIcon>
            )}
          </>
        }
      />
    </Group>
  );
};
