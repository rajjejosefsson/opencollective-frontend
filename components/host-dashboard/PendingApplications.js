import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import { API_V2_CONTEXT, gqlV2 } from '../../lib/graphql/helpers';
import { Router } from '../../server/pages';

import Container from '../Container';
import { Box, Flex, Grid } from '../Grid';
import InputSwitch from '../InputSwitch';
import LoadingPlaceholder from '../LoadingPlaceholder';
import MessageBox from '../MessageBox';
import MessageBoxGraphqlError from '../MessageBoxGraphqlError';
import Pagination from '../Pagination';
import SearchBar from '../SearchBar';
import StyledHr from '../StyledHr';
import { H1, Span } from '../Text';

import HostAdminCollectiveFilters from './HostAdminCollectiveFilters';
import PendingApplication from './PendingApplication';

const COLLECTIVES_PER_PAGE = 20;

// TODO: This query is using `legacyId` for host and member.account to interface with the
// legacy `AddFundsForm`. Once the new add funds form will be implemented, we can remove these fields.
const hostedCollectivesQuery = gqlV2/* GraphQL */ `
  query HostDashboardHostedCollectives(
    $hostSlug: String!
    $limit: Int!
    $offset: Int!
    $orderBy: ChronologicalOrderInput!
    $hostFeesStructure: HostFeeStructure
    $searchTerm: String
  ) {
    host(slug: $hostSlug) {
      id
      legacyId
      slug
      name
      currency
      isHost
      type
      hostFeePercent
      memberOf(
        role: HOST
        limit: $limit
        offset: $offset
        orderBy: $orderBy
        hostFeesStructure: $hostFeesStructure
        searchTerm: $searchTerm
        isApproved: true
      ) {
        offset
        limit
        totalCount
        nodes {
          id
          createdAt
          account {
            id
            legacyId
            name
            slug
            website
            description
            type
            currency
            imageUrl(height: 96)
            tags
            settings
            createdAt
            stats {
              balance {
                valueInCents
              }
            }
            admins: members(role: ADMIN) {
              totalCount
              nodes {
                id
                account {
                  id
                  type
                  slug
                  name
                  imageUrl(height: 48)
                }
              }
            }
            ... on AccountWithHost {
              hostFeesStructure
              hostFeePercent
            }
            ... on AccountWithContributions {
              totalFinancialContributors
            }
          }
        }
      }
    }
  }
`;

const checkIfQueryHasFilters = query =>
  Object.entries(query).some(([key, value]) => {
    return !['view', 'offset', 'limit', 'hostCollectiveSlug', 'sort-by'].includes(key) && value;
  });

const getVariablesFromQuery = query => {
  return {
    offset: parseInt(query.offset) || 0,
    limit: parseInt(query.limit) || COLLECTIVES_PER_PAGE,
    searchTerm: query.searchTerm,
    hostFeesStructure: query['fees-structure'],
    orderBy: {
      field: 'CREATED_AT',
      direction: query['sort-by'] === 'oldest' ? 'ASC' : 'DESC',
    },
  };
};

const PendingApplications = ({ hostSlug }) => {
  const { query } = useRouter() || {};
  const hasFilters = React.useMemo(() => checkIfQueryHasFilters(query), [query]);
  const { data, error, loading, variables } = useQuery(hostedCollectivesQuery, {
    variables: { hostSlug, ...getVariablesFromQuery(query) },
    context: API_V2_CONTEXT,
  });

  const hostedMemberships = data?.host?.memberOf;
  return (
    <Box maxWidth={1000} m="0 auto" py={5} px={2}>
      <Flex alignItems="center" mb={24} flexWrap="wrap">
        <H1 fontSize="32px" lineHeight="40px" py={2} fontWeight="normal">
          <FormattedMessage id="host.dashboard.tab.pendingApplications" defaultMessage="Pending applications" />
        </H1>
        <Box mx="auto" />
        <Box p={2}>
          <SearchBar
            defaultValue={query.searchTerm}
            onSubmit={searchTerm => Router.pushRoute('host.dashboard', { ...query, searchTerm, offset: null })}
          />
        </Box>
      </Flex>
      <StyledHr mb={26} borderWidth="0.5px" />
      <Box mb={34}>
        {data?.host ? (
          <HostAdminCollectiveFilters
            filters={query}
            onChange={queryParams =>
              Router.pushRoute('host.dashboard', {
                ...query,
                ...queryParams,
                offset: null,
              })
            }
          />
        ) : loading ? (
          <LoadingPlaceholder height={70} />
        ) : null}
      </Box>

      <Container borderTop="1px dashed #4E5052" borderBottom="1px dashed #4E5052" py={3} mb={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Span fontSize="14px" fontWeight="700" color="black.900">
            <FormattedMessage id="PendingApplications.Accepting" defaultMessage="Accepting applications" />
          </Span>
          <InputSwitch />
        </Flex>
      </Container>

      {error && <MessageBoxGraphqlError error={error} mb={2} />}

      {!error && !loading && !hostedMemberships?.nodes.length ? (
        <MessageBox type="info" withIcon data-cy="zero-collective-message">
          {hasFilters ? (
            <FormattedMessage id="discover.searchNoResult" defaultMessage="No collective matches the current search." />
          ) : (
            <FormattedMessage id="menu.collective.none" defaultMessage="No collectives yet" />
          )}
        </MessageBox>
      ) : (
        <React.Fragment>
          {loading
            ? Array.from(new Array(COLLECTIVES_PER_PAGE)).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Box key={index} mb={24}>
                  <LoadingPlaceholder height={362} borderRadius="8px" />
                </Box>
              ))
            : hostedMemberships?.nodes.map(member => (
                <Box key={member.id} mb={24}>
                  <PendingApplication host={data.host} collective={member.account} since={member.createdAt} />
                </Box>
              ))}
          <Flex mt={5} justifyContent="center">
            <Pagination
              route="host.dashboard"
              total={hostedMemberships?.totalCount}
              limit={variables.limit}
              offset={variables.offset}
              scrollToTopOnChange
            />
          </Flex>
        </React.Fragment>
      )}
    </Box>
  );
};

PendingApplications.propTypes = {
  hostSlug: PropTypes.string.isRequired,
};

export default PendingApplications;
