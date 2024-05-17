import { useCallback, useEffect, useRef, useState } from 'react';
import { IWidgetProps } from '../types'

export default function TextRenderer({ info, fieldConfig, fieldConfigs }: IWidgetProps): React.ReactNode {

  const initialValue = info.getValue();

  const inputRef = useRef<HTMLInputElement>(null);
  
  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue ] = useState<string>('');

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onClickHandler = useCallback( () => {
    setEditing(true)
    console.log('setEditing: inputRef.current: ', inputRef.current);
    if (inputRef.current) {
      console.log('select');
      inputRef.current.focus();
      inputRef.current.select();
    }
  },[]);

  useEffect(() => {
    if (inputRef.current) {
      console.log('select')
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, []);

  const showInputRef = useCallback( () => {
    console.log('showInput: inputRef.current: ', inputRef.current)
  }, []);
  // useEffect(() => {
  //   setValue(info.getValue());  
  // }, [info]);

  // console.log(fieldConfig || null)
  // console.log(fieldConfigs || null)
  // console.log('render');
  return (
    <div className="w-full h-full px-1 flex flex-col justify-center">
    {!editing && (
      <div onClick={()=>onClickHandler()}
      className="w-full whitespace-nowrap text-ellipsis overflow-hidden">{value}</div>
    )}
    {/* {editing && (
      <input ref={inputRef} className="w-full bg-yellow-300 text-black"
        onBlur={()=>setEditing(false)}
        value={value}
        onChange={(event)=>setValue(event.target.value)}/>
      )} */}
      {/* <button onClick={showInputRef}>show</button> */}
    </div>
  );
}
