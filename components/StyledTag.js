import React from 'react';
import PropTypes from 'prop-types';
import { Times } from '@styled-icons/fa-solid/Times';
import styled from 'styled-components';
import { background, border, color, layout, position, space, typography, variant } from 'styled-system';

import { textTransform } from '../lib/styled-system-custom-properties';

import { Span } from './Text';

const defaultRoundedStyleProps = {
  backgroundColor: 'black.100',
  maxHeight: '24px',
  display: 'inline-flex',
  alignItems: 'center',
  color: 'black.700',
  fontSize: '12px',
  lineHeight: '18px',
};

const TAG_TYPE_VARIANTS = {
  white: {
    backgroundColor: 'white.full',
    borderColor: 'black.200',
  },
  dark: {
    backgroundColor: 'black.800',
    borderColor: 'black.900',
    color: 'white.full',
  },
  grey: {
    backgroundColor: 'black.300',
    borderColor: 'black.300',
    color: 'black.900',
  },
  info: {
    backgroundColor: 'blue.100',
    borderColor: 'blue.400',
    color: 'blue.600',
  },
  success: {
    backgroundColor: 'green.100',
    borderColor: 'green.500',
    color: 'green.700',
  },
  warning: {
    backgroundColor: 'yellow.300',
    borderColor: 'yellow.500',
    color: 'yellow.900',
  },
  error: {
    backgroundColor: 'red.100',
    borderColor: 'red.500',
    color: 'red.500',
  },
};

const StyledTagBase = styled.div`
  text-align: center;
  white-space: nowrap;
  letter-spacing: 0.06em;

  ${variant({
    prop: 'variant',
    variants: {
      squared: {
        color: '#71757A',
        background: '#F0F2F5',
        borderRadius: '4px',
        padding: '6px 8px',
        fontSize: '9px',
        lineHeight: '12px',
      },
      'rounded-right': {
        ...defaultRoundedStyleProps,
        borderRadius: '2px 12px 12px 2px',
        padding: '3px 10px 3px 6px',
      },
      'rounded-left': {
        ...defaultRoundedStyleProps,
        borderRadius: '12px 2px 2px 12px',
        padding: '3px 6px 3px 10px',
      },
      rounded: {
        ...defaultRoundedStyleProps,
        borderRadius: '12px 12px 12px 12px',
        padding: '3px 6px 3px 10px',
      },
    },
  })}

  & > * {
    vertical-align: middle;
  }

  ${variant({ prop: 'type', variants: TAG_TYPE_VARIANTS })}

  ${background}
  ${color}
  ${space}
  ${border}
  ${typography}
  ${layout}
  ${position}
  ${textTransform}
`;

const CloseButton = styled.button.attrs({
  type: 'button',
  'data-cy': 'remove-btn',
})`
  cursor: pointer;
  color: inherit;
  text-align: center;
  background-color: transparent;
  border: none;
  padding: 0;
  line-height: inherit;
  outline: none;
`;

/** Simple tag to display a short string */
const StyledTag = ({ closeButtonProps, children, ...props }) => {
  return !closeButtonProps ? (
    <StyledTagBase {...props}>{children}</StyledTagBase>
  ) : (
    <StyledTagBase {...props}>
      <Span mr={2} letterSpacing="inherit">
        {children}
      </Span>
      <CloseButton {...closeButtonProps}>
        <Times size="10px" />
      </CloseButton>
    </StyledTagBase>
  );
};

StyledTag.propTypes = {
  closeButtonProps: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  /** If defined, a close button will be displayed on the tag */
  onClose: PropTypes.func,
  backgroundColor: PropTypes.string,
  variant: PropTypes.oneOf(['squared', 'rounded-right', 'rounded-left', 'rounded']),
  children: PropTypes.node,
  type: PropTypes.oneOf(Object.keys(TAG_TYPE_VARIANTS)),
};

StyledTag.defaultProps = {
  variant: 'squared',
};

export default StyledTag;
