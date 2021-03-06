import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RatingFilter } from 'pages/search/components/RatingFilter';
import { FormProvider, useForm } from 'react-hook-form';
import { renderComponent } from 'unit/componentRenderers';

describe('RatingFilter', () => {

  test('should render correctly', () => {
    const {asFragment} = renderComponentUnderTest();
    expect(asFragment()).toMatchSnapshot();
  })

  test('should display correct label', () => {
    renderComponentUnderTest();

    expect(screen.getByLabelText('Rating')).toBeInTheDocument();
  });

  test('should render all options', () => {
    renderComponentUnderTest();

    const button = screen.getByRole('button');
    userEvent.type(button, '{arrowdown}');

    const actualOptions = screen.getAllByRole('option');
    expect(actualOptions).toHaveLength(ratingOptions.length);

    ratingOptions.forEach((rating) => {
      expect(screen.getByRole('option', { name: rating })).toBeInTheDocument();
    });
  });

  test('should update with selected value', () => {
    renderComponentUnderTest();

    const button = screen.getByRole('button');
    userEvent.type(button, '{arrowdown}');
    userEvent.type(button, '{arrowdown}');
    userEvent.type(screen.getAllByRole('option')[1], '{enter}');

    expect(button).toHaveTextContent(ratingOptions[1]);
  });
});

// eslint-disable-next-line react/prop-types
const Select = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <RatingFilter />
    </FormProvider>
  );
};

const ratingOptions = ['None', '50', '60', '70', '80', '85', '90', '95', '100'];

const renderComponentUnderTest = () => {
  return renderComponent(
    <Select defaultValue="" />,
  );
};

