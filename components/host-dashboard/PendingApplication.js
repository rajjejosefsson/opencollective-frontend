import React from 'react';
import PropTypes from 'prop-types';
import { Ban } from '@styled-icons/fa-solid/Ban';
import { Check } from '@styled-icons/fa-solid/Check';
import { Mail } from '@styled-icons/feather/Mail';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { padding } from 'styled-system';

import { getCollectiveMainTag } from '../../lib/collective.lib';
import { CustomScrollbarCSS } from '../../lib/styled-components-shared-styles';

import Avatar from '../Avatar';
import Container from '../Container';
import { Box, Flex } from '../Grid';
import I18nCollectiveTags from '../I18nCollectiveTags';
import CommentIcon from '../icons/CommentIcon';
import LinkCollective from '../LinkCollective';
import StyledButton from '../StyledButton';
import StyledCollectiveCard from '../StyledCollectiveCard';
import StyledHr from '../StyledHr';
import StyledRoundButton from '../StyledRoundButton';
import StyledTag from '../StyledTag';
import { P, Span } from '../Text';

const ApplicationBody = styled.div`
  height: 267px;
  overflow-y: auto;

  ${padding}
  ${CustomScrollbarCSS}

  @media (pointer: fine) {
    &::-webkit-scrollbar {
      width: 4px;
      border-radius: 8px;
    }
  }
`;

const CollectiveCardBody = styled.div`
  padding: 8px 16px 16px 16px;
  overflow-y: auto;
  height: 100%;
  ${CustomScrollbarCSS}
  @media (pointer: fine) {
    &::-webkit-scrollbar {
      width: 4px;
      border-radius: 8px;
    }
  }
`;

const PendingApplication = ({ collective, ...props }) => {
  return (
    <Container display="flex" flexDirection={['column', 'row']} border="1px solid #DCDEE0" borderRadius="16px">
      <StyledCollectiveCard
        collective={collective}
        bodyHeight={258}
        width={['100%', 224]}
        borderRadius={[16, '16px 0 0 16px']}
        borderWidth="0"
        showWebsite
        tag={
          <Flex mt={12}>
            <StyledTag type="warning" textTransform="uppercase" mr={2}>
              <FormattedMessage id="Pending" defaultMessage="Pending" />
            </StyledTag>
            <StyledTag variant="rounded-right">
              <I18nCollectiveTags
                tags={getCollectiveMainTag(get(collective, 'host.id'), collective.tags, collective.type)}
              />
            </StyledTag>
          </Flex>
        }
        {...props}
      >
        <CollectiveCardBody>
          {collective.admins.totalCount > 0 && (
            <Box>
              <Flex alignItems="center">
                <Span
                  color="black.500"
                  fontSize="9px"
                  textTransform="uppercase"
                  fontWeight="500"
                  letterSpacing="0.06em"
                >
                  <FormattedMessage id="Admins" defaultMessage="Admins" />
                </Span>
                <StyledHr borderColor="black.300" flex="1 1" ml={2} />
              </Flex>
              <Flex mt={2} alignItems="center">
                {collective.admins.nodes.slice(0, 6).map(admin => (
                  <Box key={admin.id} mr={1}>
                    <LinkCollective collective={admin.account}>
                      <Avatar collective={admin.account} radius="24px" />
                    </LinkCollective>
                  </Box>
                ))}
                {collective.admins.totalCount > 6 && (
                  <Container ml={2} pt="0.7em" fontSize="12px" color="black.600">
                    + {collective.admins.totalCount - 6}
                  </Container>
                )}
              </Flex>
            </Box>
          )}
          {collective.description && (
            <Box mt={3}>
              <Flex alignItems="center">
                <Span
                  color="black.500"
                  fontSize="9px"
                  textTransform="uppercase"
                  fontWeight="500"
                  letterSpacing="0.06em"
                >
                  <FormattedMessage id="OurPurpose" defaultMessage="Our purpose" />
                </Span>
                <StyledHr borderColor="black.300" flex="1 1" ml={2} />
              </Flex>
              <P mt={1} fontSize="12px" lineHeight="18px" color="black.800">
                {collective.description}
              </P>
            </Box>
          )}
        </CollectiveCardBody>
      </StyledCollectiveCard>
      <Container
        background="white"
        flex="1 1"
        borderLeft={[null, '1px solid #DCDEE0']}
        borderRadius={[16, '0 16px 16px 0']}
        minWidth={300}
        display="flex"
        flexDirection="column"
        alignItems="space-between"
        height={332}
      >
        <Box px="4px">
          <ApplicationBody p={[12, 22]}>
            <Flex alignItems="center" mb={3}>
              <CommentIcon size={16} />
              <Span fontSize="11px" fontWeight="500" color="black.500" textTransform="uppercase" mx={2}>
                <FormattedMessage id="PendingApplication.Message" defaultMessage="Message for fiscal host" />
              </Span>
              <StyledHr borderColor="black.200" flex="1 1" />
            </Flex>
            <P
              as="q"
              fontSize={['14px', '16px']}
              lineHeight="24px"
              fontStyle="italic"
              color="black.800"
              fontWeight="400"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nihilo magis. Tu autem, si tibi illa probabantur,
              cur non propriis verbis ea tenebas? Satis est tibi in te, satis in legibus, satis in mediocribus amicitiis
              praesidii. Solum praeterea formosum, solum liberum, solum civem, stultost; Duo Reges: constructio
              interrete. Torquatus, is qui consul cum Cn. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nihilo magis. Tu autem, si tibi illa probabantur, cur non propriis verbis ea tenebas? Satis est tibi in
              te, satis in legibus, satis in mediocribus amicitiis praesidii. Solum praeterea formosum, solum liberum,
              solum civem, stultost; Duo Reges: constructio interrete. Torquatus, is qui consul cum Cn. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Nihilo magis. Tu autem, si tibi illa probabantur, cur non
              propriis verbis ea tenebas? Satis est tibi in te, satis in legibus, satis in mediocribus amicitiis
              praesidii. Solum praeterea formosum, solum liberum, solum civem, stultost; Duo Reges: constructio
              interrete. Torquatus, is qui consul cum Cn. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nihilo magis. Tu autem, si tibi illa probabantur, cur non propriis verbis ea tenebas? Satis est tibi in
              te, satis in legibus, satis in mediocribus amicitiis praesidii. Solum praeterea formosum, solum liberum,
              solum civem, stultost; Duo Reges: constructio interrete. Torquatus, is qui consul cum Cn.
            </P>
          </ApplicationBody>
        </Box>
        <Container
          display="flex"
          p={3}
          justifyContent="space-between"
          alignItems="center"
          borderTop="1px solid #DCDEE0"
          boxShadow="0px -2px 4px 0px rgb(49 50 51 / 6%)"
        >
          <StyledRoundButton size={32}>
            <Mail size={15} color="#4E5052" />
          </StyledRoundButton>
          <Flex>
            <StyledButton buttonSize="tiny" buttonStyle="successSecondary" height={32}>
              <Check size={12} />
              &nbsp; <FormattedMessage id="actions.approve" defaultMessage="Approve" />
            </StyledButton>
            <StyledButton buttonSize="tiny" buttonStyle="dangerSecondary" ml={3} height={32}>
              <Ban size={12} />
              &nbsp; <FormattedMessage id="actions.reject" defaultMessage="Reject" />
            </StyledButton>
          </Flex>
        </Container>
      </Container>
    </Container>
  );
};

PendingApplication.propTypes = {
  collective: PropTypes.shape({
    description: PropTypes.string,
    tags: PropTypes.array,
    type: PropTypes.string,
    admins: PropTypes.shape({
      totalCount: PropTypes.number,
      nodes: PropTypes.array,
    }),
  }).isRequired,
};

export default PendingApplication;
