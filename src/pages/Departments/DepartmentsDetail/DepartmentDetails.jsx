import { Button, Section } from 'components';
import React from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router';
import { selectDepartments } from 'store/departments/selectors';

const DepartmentDetails = () => {
  const navigate = useNavigate();
  const { departmentId } = useParams();
  const departments = useSelector(selectDepartments);
  const department = useMemo(
    () => departments.find(({ id }) => id === departmentId),
    [departmentId, departments]
  );

  return (
    department && (
      <>
        <Section title={department.text}>
          <Button
            text="Description"
            action={() => {
              navigate('description');
            }}
          />
          <Button
            text="History"
            action={() => {
              navigate('history');
            }}
          />
        </Section>
        <Outlet />
      </>
    )
  );
};

export default DepartmentDetails;
