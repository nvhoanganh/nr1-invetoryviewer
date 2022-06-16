import React, { useState, useEffect, useContext } from 'react';
import {
  Stack,
  StackItem,
  HeadingText,
  Layout,
  LayoutItem,
  EmptyState,
  BlockText,
  Popover,
  PopoverBody,
  PopoverTrigger,
  Icon,
  Button,
  AccountPicker,
  Modal,
  navigation,

  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableRowCell,
  EntityTitleTableRowCell,
  JsonChart
} from 'nr1';

function DisplayResult({ scanResult }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [sort, setSort] = useState({ by: '', direction: TableHeaderCell.SORTING_TYPE.NONE });

  return (
    <>
      <Modal hidden={!modalOpen} onClose={() => setModalOpen(false)}>
        <HeadingText type={HeadingText.TYPE.HEADING_3}>
          Detected Data
        </HeadingText>

        <JsonChart data={modalOpen} fullWidth fullHeight />

        <Button onClick={() => setModalOpen(false)}>Close</Button>
      </Modal>
      <Table items={scanResult}>
        <TableHeader>
          <TableHeaderCell value={({ item }) => item.guid}>
            Guid
          </TableHeaderCell>
          <TableHeaderCell value={({ item }) => item.name}
            sortable={true}
            onClick={(e, sort) => setSort({ by: 'name', direction: sort.nextSortingType })}
            sortingType={sort.by === 'name' ? sort.direction : TableHeaderCell.SORTING_TYPE.NONE}
          >
            Name
          </TableHeaderCell>
          <TableHeaderCell value={({ item }) => item.host}
            sortable={true}
            onClick={(e, sort) => setSort({ by: 'host', direction: sort.nextSortingType })}
            sortingType={sort.by === 'host' ? sort.direction : TableHeaderCell.SORTING_TYPE.NONE}
          >
            Host
          </TableHeaderCell>
          <TableHeaderCell value={({ item }) => item.language}
            sortable={true}
            onClick={(e, sort) => setSort({ by: 'language', direction: sort.nextSortingType })}
            sortingType={sort.by === 'language' ? sort.direction : TableHeaderCell.SORTING_TYPE.NONE}>
            Language
          </TableHeaderCell>
          <TableHeaderCell>
          </TableHeaderCell>
        </TableHeader>

        {({ item }) => {
          return (
            <TableRow>
              <EntityTitleTableRowCell
                value={item}
                onClick={() => navigation.openStackedEntity(item.guid)}
              />
              <TableRowCell>
                {item.name}
              </TableRowCell>
              <TableRowCell>
                {item.host}
              </TableRowCell>
              <TableRowCell>
                {item.language}
              </TableRowCell>
              <TableRowCell>
                <Button
                  sizeType={Button.SIZE_TYPE.SMALL}
                  onClick={() => setModalOpen(item)}
                >
                  View data
                </Button>
              </TableRowCell>
            </TableRow>
          );
        }}
      </Table>
    </>
  );
}

export default DisplayResult;