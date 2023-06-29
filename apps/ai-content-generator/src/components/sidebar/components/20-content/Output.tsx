import { FormControl, Select } from '@contentful/f36-components';

const Ouput = () => {
  return (
    <FormControl>
      <FormControl.Label>Where should the content be output?</FormControl.Label>
      <Select defaultValue="" onChange={(event) => setField(event.target.value)}>
        <Select.Option value="" isDisabled>
          Select a field...
        </Select.Option>
        {richTextFields
          .filter((field) => field.currentEditor)
          .map((field, index) => {
            return (
              <Select.Option value={field.name} key={index}>
                {getFieldName(field.name)}
              </Select.Option>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default Ouput;
