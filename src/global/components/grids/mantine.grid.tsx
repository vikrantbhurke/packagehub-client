import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { oneBg } from "@/global/styles/app.css";
import {
  Box,
  Center,
  Grid,
  Group,
  Pagination,
  ScrollArea,
  Stack,
} from "@mantine/core";
import { layoutCompHeight } from "@/global/styles/global.styles";
import { useSelector } from "react-redux";
import { useIsComponentVisible } from "@/global/hooks";
import { setIsPaginationVisible } from "@/global/states/view.slice";
import { Breakpoint } from "@/global/enums";
import { CustomNumberCombobox } from "../reusables";

export const MantineGrid = ({
  p,
  page,
  gridBg,
  setPage,
  dataArray,
  totalPages,
  gridItemStyle = {},
  GridItemLayout,
  onMouseEnter,
  onMouseLeave,
}: any) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  useIsComponentVisible(ref, setIsPaginationVisible);
  let [searchParams, setSearchParams] = useSearchParams();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { isMobile, width } = useSelector((state: any) => state.view);

  const handlePage = (page: number) => {
    dispatch(setPage(page));
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", `${page}`);
    setSearchParams(newSearchParams);

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

  let totalGhostItems;
  let dataArrayLength = dataArray.length;

  if (width < Breakpoint.lg) totalGhostItems = 0;
  else if (width < Breakpoint.xl)
    totalGhostItems = dataArrayLength % 2 === 0 ? 0 : 1;
  else
    totalGhostItems = dataArrayLength % 3 === 0 ? 0 : 3 - (dataArrayLength % 3);

  const extraGridItems: Array<any> = new Array(totalGhostItems)
    .fill(0)
    .map((_) => {
      return (
        <Grid.Col p={isMobile ? 0 : p} span={{ base: 12, lg: 6, xl: 4 }}>
          <Box component="div" h="100%"></Box>
        </Grid.Col>
      );
    });

  return (
    <Stack
      gap={0}
      justify="space-between"
      h={`calc(100% - ${layoutCompHeight}px - ${isMobile ? 50 : 90}px)`}
      bg={gridBg}>
      <ScrollArea ref={scrollAreaRef} scrollbarSize={2}>
        <Grid grow justify="center" gutter={0} p={isMobile ? 0 : p}>
          {dataArray.map((item: any, index: number) => {
            return (
              <Grid.Col
                p={isMobile ? 0 : p}
                span={{ base: 12, lg: 6, xl: 4 }}
                key={index}>
                <Box
                  component="div"
                  bg={oneBg}
                  style={gridItemStyle}
                  h="100%"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}>
                  <GridItemLayout item={item} />
                </Box>
              </Grid.Col>
            );
          })}

          {extraGridItems}
        </Grid>
      </ScrollArea>

      <Center ref={ref} bg={oneBg} style={{ zIndex: 1 }}>
        <Group gap={0} align="center">
          <CustomNumberCombobox
            data={Array.from({ length: totalPages }, (_, i) => i + 1)}
            value={page}
            handleValue={handlePage}
            id="pagination-combobox"
            totalPages={totalPages}
          />

          <Pagination
            size="md"
            m="xs"
            siblings={0}
            value={page}
            onChange={handlePage}
            total={totalPages}
          />
        </Group>
      </Center>
    </Stack>
  );
};
