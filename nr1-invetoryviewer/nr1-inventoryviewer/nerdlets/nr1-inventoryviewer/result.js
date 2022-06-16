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
          <TableHeaderCell value={({ item }) => item.name} sortable={true} onClick={(e, sort) => {
            console.log(e, sort);
          }}>
            Name
          </TableHeaderCell>
          <TableHeaderCell value={({ item }) => item.host} sortable={true}>
            Host
          </TableHeaderCell>
          <TableHeaderCell value={({ item }) => item.language} sortable={true}>
            Language
          </TableHeaderCell>
          <TableHeaderCell>
            Action
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