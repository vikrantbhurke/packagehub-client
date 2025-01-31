import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOrder, setSort, setRating, setPage } from "../review.slice";
import { ActionIcon, Group, Modal, Space, Stack, Text } from "@mantine/core";
import {
  modal,
  modalOverlayProps,
  textBold,
} from "@/global/styles/global.styles";
import { CustomEnumCombobox, I } from "@/global/components/reusables";
import { Order } from "@/global/enums";
import { globalUtility } from "@/global/utilities";
import { useSearchParams } from "react-router-dom";
import { IconRefresh } from "@tabler/icons-react";
import { Rating, Sort } from "../enums";
import { oneBg } from "@/global/styles/app.css";
import { RootState } from "@/global/states/store";

export const ReviewsFilterModal = ({ opened, close }: any) => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();

  const { order, sort, rating } = useSelector(
    (state: RootState) => state.review
  );

  const handleSort = (sort: any) => {
    dispatch(setSort(sort));
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", sort);
    setSearchParams(newSearchParams);
  };

  const handleOrder = (order: any) => {
    dispatch(setOrder(order));
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("order", order);
    setSearchParams(newSearchParams);
  };

  const handleRating = (rating: any) => {
    dispatch(setRating(rating));
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("rating", rating);
    setSearchParams(newSearchParams);
  };

  const handleRefresh = () => {
    dispatch(setPage(1));
    dispatch(setSort(Sort.Rating));
    dispatch(setOrder(Order.Descending));
    dispatch(setRating(Rating["★ Any"]));
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", `1`);
    newSearchParams.set("sort", Sort.Rating);
    newSearchParams.set("order", Order.Descending);
    newSearchParams.set("rating", Rating["★ Any"]);
    setSearchParams(newSearchParams);
  };

  return (
    <Modal
      styles={modal}
      overlayProps={modalOverlayProps}
      opened={opened}
      onClose={close}
      centered
      title="Review Filter">
      <Stack bg={oneBg}>
        <Stack align="center" gap="xs">
          <Group justify="space-between" w="100%">
            <Space w="md" />

            <Text fw={textBold}>Rating</Text>

            {order !== Order.Descending ||
            sort !== Sort.Rating ||
            rating !== Rating["★ Any"] ? (
              <ActionIcon aria-label="Refresh" onClick={handleRefresh}>
                <I I={IconRefresh} />
              </ActionIcon>
            ) : (
              <ActionIcon
                disabled
                aria-label="Refresh Disabled"
                c="transparent"
              />
            )}
          </Group>

          <CustomEnumCombobox
            shouldCapitalize={false}
            id="package-rating-box"
            EnumObject={Rating}
            label="Rating"
            data={Object.values(Rating)}
            handleValue={handleRating}
            value={globalUtility.getKeyByValue(Rating, rating)}
          />
        </Stack>

        <Stack align="center" gap="xs">
          <Text fw={textBold}>Sort</Text>

          <CustomEnumCombobox
            id="package-sort-box"
            EnumObject={Sort}
            label="Sort"
            data={Object.values(Sort)}
            handleValue={handleSort}
            value={globalUtility.getKeyByValue(Sort, sort)}
          />
        </Stack>

        <Stack align="center" gap="xs">
          <Text fw={textBold}>Order</Text>

          <CustomEnumCombobox
            id="package-order-box"
            EnumObject={Order}
            label="Order"
            data={Object.values(Order)}
            handleValue={handleOrder}
            value={globalUtility.getKeyByValue(Order, order)}
          />
        </Stack>
      </Stack>
    </Modal>
  );
};
