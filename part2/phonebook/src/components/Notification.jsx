const Notification = ({ notif}) => {
  if (notif.message === null) {
    return null
  }

  return (
    <div className={notif.type}>
      {notif.message}
    </div>
  )
}

export default Notification