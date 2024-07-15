<CustomTextField
        select
        fullWidth
        sx={{ mb: 4 }}
        defaultValue=''
        label='Switch Code'
        placeholder='Switch Code'
        id='form-layouts-tabs-multiple-select'
        SelectProps={{
          multiple: false,
          value: code,
          onChange: e => setCode(e.target.value)
        }}
        required
      >
      {data2.filter(val => !isSwitchCodeInData3(val.switch_code)).map((val) => (
        <MenuItem key={val.id} value={val.switch_code}>
          {val.switch_code}</MenuItem>
      ))}
      </CustomTextField>
