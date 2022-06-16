import React, { useState, useEffect, useContext } from 'react';
import {
  Stack,
  StackItem,
  HeadingText,
  Layout,
  LayoutItem,
  TextField,
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

function getLanguageSpecificVerions(data) {
  if (data.language === 'nodejs') return data['Node.js version'];
  if (data.language === 'java') return data['Java version'] + ' , JVM: ' + data['Java VM version'];
  if (data.language === 'python') return data['Python Version'];
  if (data.language === 'ruby') return data['Ruby version'] + ' , OpenSSL:' + data['Open SSL version'];
  if (data.language === 'php') return data['Apache Version'];
  if (data.language === 'dotnet') return data['NET Version'];
  if (data.language === 'c') return 'N/A';
  return '-';
}

function DisplayResult({ scanResult }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ by: '', direction: TableHeaderCell.SORTING_TYPE.NONE });

  const filtered = (data, query) => {
    return data.filter(
      x => x.language.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
        x.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
        x['newrelic.version'].toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
        x['OS version'].toLowerCase().indexOf(query.toLowerCase()) >= 0
    );
  }

  return (
    <>
      <Modal hidden={!modalOpen} onClose={() => setModalOpen(false)}>
        <HeadingText type={HeadingText.TYPE.HEADING_3}>
          Details
        </HeadingText>

        <JsonChart data={modalOpen} fullWidth fullHeight />

        <Button onClick={() => setModalOpen(false)}>Close</Button>
      </Modal>

      <StackItem style={{ marginBottom: '20px', marginTop: '20px' }}>
        <TextField type={TextField.TYPE.SEARCH} label="Search" labelInline placeholder="e.g. Java, sock" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button
          style={{ float: 'right', marginRight: '20px'}}
          sizeType={Button.SIZE_TYPE.SMALL}
        >
          Export to CSV
        </Button>
      </StackItem>

      <Table items={filtered(scanResult, search)}>
        <TableHeader>
          <TableHeaderCell value={({ item }) => item.guid}>
            Guid
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
          <TableHeaderCell value={({ item }) => item['newrelic.version']}
            sortable={true}
            onClick={(e, sort) => setSort({ by: 'newrelic.version', direction: sort.nextSortingType })}
            sortingType={sort.by === 'newrelic.version' ? sort.direction : TableHeaderCell.SORTING_TYPE.NONE}>
            NR Version
          </TableHeaderCell>
          <TableHeaderCell value={({ item }) => item['OS version']}
            sortable={true}
            onClick={(e, sort) => setSort({ by: 'OS version', direction: sort.nextSortingType })}
            sortingType={sort.by === 'OS version' ? sort.direction : TableHeaderCell.SORTING_TYPE.NONE}>
            OS Version
          </TableHeaderCell>
          <TableHeaderCell value={({ item }) => item.accountId} width="150px"
            sortable={true}
            onClick={(e, sort) => setSort({ by: 'accountId', direction: sort.nextSortingType })}
            sortingType={sort.by === 'accountId' ? sort.direction : TableHeaderCell.SORTING_TYPE.NONE}
          >
            AccountId
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
                {item.host}
              </TableRowCell>
              <TableRowCell>
                {item.language} ({getLanguageSpecificVerions(item)})
              </TableRowCell>
              <TableRowCell>
                {item['newrelic.version']}
              </TableRowCell>
              <TableRowCell>
                {item['OS version']}
              </TableRowCell>
              <TableRowCell>
                {item.accountId}
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