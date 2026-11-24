function KartuTugas({
  tugas,
  index,
  mode = 'tabel-lengkap',
  onToggleStatus,
  onHapusTugas,
  onLihatDetail,
}) {
  const getPriorityBadge = (prioritas) => {
    if (prioritas === 'High') {
      return (
        <span className="badge badge-priority-high">
          <i className="bi bi-exclamation-circle-fill me-1 small"></i>High
        </span>
      );
    }
    if (prioritas === 'Medium') {
      return (
        <span className="badge badge-priority-medium">
          <i className="bi bi-dash-circle-fill me-1 small"></i>Medium
        </span>
      );
    }
    return (
      <span className="badge badge-priority-low">
        <i className="bi bi-arrow-down-circle-fill me-1 small"></i>Low
      </span>
    );
  };

  const getStatusBadge = (status) => {
    if (status === 'Completed') {
      return <span className="badge badge-status-completed">Completed</span>;
    }
    if (status === 'In Progress') {
      return <span className="badge badge-status-progress">In Progress</span>;
    }
    return <span className="badge badge-status-pending">Pending</span>;
  };

  const getCourseBadgeClass = (mataKuliah) => {
    switch (mataKuliah) {
      case 'Pemrograman Web':
        return 'bg-primary-subtle text-primary border border-primary-subtle';
      case 'Rekayasa Web':
        return 'bg-info-subtle text-info border border-info-subtle';
      case 'Basis Data Lanjut':
        return 'bg-warning-subtle text-dark border border-warning-subtle';
      default:
        return 'bg-secondary-subtle text-secondary border border-secondary-subtle';
    }
  };

  if (mode === 'dashboard') {
    return (
      <tr>
        <td className="fw-semibold">{index + 1}</td>
        <td>
          <div className="fw-bold text-dark">{tugas.judul}</div>
          <small className="text-muted">{tugas.deskripsi}</small>
        </td>
        <td>
          <span className="badge bg-light text-dark border">{tugas.mataKuliah}</span>
        </td>
        <td>{getPriorityBadge(tugas.prioritas)}</td>
        <td>
          <small className="text-muted">
            <i className="bi bi-calendar3 me-1"></i>
            {tugas.tenggat}
          </small>
        </td>
        <td>{getStatusBadge(tugas.status)}</td>
      </tr>
    );
  }

  return (
    <tr>
      <td className="text-center fw-semibold text-muted">{index + 1}</td>
      <td>
        <div className="fw-bold text-dark">{tugas.judul}</div>
        <small className="text-muted text-truncate d-block" style={{ maxWidth: '280px' }}>
          {tugas.deskripsi}
        </small>
      </td>
      <td>
        <span className={`badge ${getCourseBadgeClass(tugas.mataKuliah)}`}>
          {tugas.mataKuliah}
        </span>
      </td>
      <td>{getPriorityBadge(tugas.prioritas)}</td>
      <td>
        <div className="text-dark small fw-semibold">
          <i className="bi bi-calendar3 me-1 text-muted"></i>
          {tugas.tenggat}
        </div>
        <small className="text-muted">
          <i className="bi bi-alarm me-1"></i>
          {tugas.jam || '23:59'} WIB
        </small>
      </td>
      <td>{getStatusBadge(tugas.status)}</td>
      <td className="text-end">
        <div className="btn-group btn-group-sm">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => onLihatDetail && onLihatDetail(tugas)}
            title="Detail"
          >
            <i className="bi bi-eye"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => onToggleStatus && onToggleStatus(tugas.id)}
            title="Ubah Status Selesai"
          >
            <i className="bi bi-check2"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => onHapusTugas && onHapusTugas(tugas.id)}
            title="Hapus"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default KartuTugas;