export function hello(to: string = 'World') {
  const txt = `${to + 99999}!`;
  alert(txt);
  return txt;
}
