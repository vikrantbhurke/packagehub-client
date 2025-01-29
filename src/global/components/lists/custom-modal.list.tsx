import { roundBorderStyle } from "@/global/styles/app.css";
import {
  Group,
  Pagination,
  ScrollArea,
  Stack,
  useMantineColorScheme,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { Fragment, useRef } from "react";
import { getDropdownStyles } from "@/global/styles/global.styles";

export const CustomModalList = ({
  page,
  setPage,
  dataArray,
  totalPages,
  ModalListItemLayout,
}: any) => {
  const dispatch = useDispatch();
  const { colorScheme } = useMantineColorScheme();
  const { optionBg, dropdownBg } = getDropdownStyles(colorScheme);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handlePage = (page: number) => {
    dispatch(setPage(page));

    const scrollableContainer = scrollAreaRef.current?.querySelector(
      ".mantine-ScrollArea-viewport"
    );

    if (scrollableContainer) {
      scrollableContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Stack
      gap={2}
      p={3}
      h={200}
      bg={dropdownBg}
      className={roundBorderStyle}
      justify="space-between">
      <ScrollArea ref={scrollAreaRef} scrollbarSize={2}>
        <Stack gap={3}>
          {dataArray.map((item: any, index: number) => (
            <Fragment key={index}>
              <ModalListItemLayout item={item} />
            </Fragment>
          ))}
        </Stack>
      </ScrollArea>

      <Pagination.Root value={page} onChange={handlePage} total={totalPages}>
        <Group gap={5} justify="space-evenly" py={2} bg={dropdownBg}>
          <Pagination.Previous w="49%" bg={optionBg} />
          <Pagination.Next w="49%" bg={optionBg} />
        </Group>
      </Pagination.Root>
    </Stack>
  );
};
